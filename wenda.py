import re
import functools
import bottle
from bottle import route, response, request, static_file, hook
import datetime
import json
import os
import threading
import torch
from plugins.common import error_helper, error_print, success_print
from plugins.common import CounterLock, allowCROS
from plugins.common import settings
import logging
logging.captureWarnings(True)


def load_LLM():
    try:
        from importlib import import_module
        LLM = import_module('llms.llm_'+settings.llm_type)
        return LLM
    except Exception as e:
        print("LLM模型加载失败，请阅读说明：https://github.com/l15y/wenda", e)


LLM = load_LLM()

logging = settings.logging
if logging:
    from plugins.defineSQL import session_maker, 记录

if not hasattr(LLM, "Lock"):
    mutex = CounterLock()
else:
    mutex = LLM.Lock()


model = None
tokenizer = None


def load_model():
    with mutex:
        LLM.load_model()
    torch.cuda.empty_cache()
    success_print("模型加载完成")


thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()
zhishiku = None


def load_zsk():
    try:
        from importlib import import_module
        global zhishiku
        import plugins.zhishiku as zsk
        zhishiku = zsk
        success_print("知识库加载完成")
    except Exception as e:
        error_helper(
            "知识库加载失败，请阅读说明", r"https://github.com/l15y/wenda#%E7%9F%A5%E8%AF%86%E5%BA%93")
        raise e


thread_load_zsk = threading.Thread(target=load_zsk)
thread_load_zsk.start()


@route('/static/<path:path>')
def staticjs(path='-'):
    if path.endswith(".html"):
        noCache()
    if path.endswith(".js"):
        return static_file(path, root="views/static/", mimetype="application/javascript")
    return static_file(path, root="views/static/")

@route('/assets/<path:path>')
def webui_assets(path='-'):
    if path.endswith(".html"):
        noCache()
    if path.endswith(".js"):
        return static_file(path, root="views/assets/", mimetype="application/javascript")
    return static_file(path, root="views/assets/")


@route('/:name')
def static(name='-'):
    if name.endswith(".html"):
        noCache()
    return static_file(name, root="views")


@route('/api/llm')
def llm_js():
    noCache()
    return static_file('llm_'+settings.llm_type+".js", root="llms")


@route('/api/plugins')
def read_auto_plugins():
    noCache()
    plugins = []
    for root, dirs, files in os.walk("autos"):
        for file in files:
            if(file.endswith(".js")):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding='utf-8') as f:
                    plugins.append(f.read())
    return "\n".join(plugins)
# @route('/writexml', method=("POST","OPTIONS"))
# def writexml():
    # data = request.json
    # s=json2xml(data).decode("utf-8")
    # with open(os.environ['wenda_'+'Config']+"_",'w',encoding = "utf-8") as f:
    #     f.write(s)
    #     # print(j)
    #     return s


def noCache():
    response.set_header("Pragma", "no-cache")
    response.add_header("Cache-Control", "must-revalidate")
    response.add_header("Cache-Control", "no-cache")
    response.add_header("Cache-Control", "no-store")


def pathinfo_adjust_wrapper(func):
    # A wrapper for _handle() method
    @functools.wraps(func)
    def _(s, environ):
        environ["PATH_INFO"] = environ["PATH_INFO"].encode(
            "utf8").decode("latin1")
        return func(s, environ)
    return _


bottle.Bottle._handle = pathinfo_adjust_wrapper(
    bottle.Bottle._handle)  # 修复bottle在处理utf8 url时的bug

@hook('before_request')
def validate():
    REQUEST_METHOD = request.environ.get('REQUEST_METHOD')
    HTTP_ACCESS_CONTROL_REQUEST_METHOD = request.environ.get(
        'HTTP_ACCESS_CONTROL_REQUEST_METHOD')
    if REQUEST_METHOD == 'OPTIONS' and HTTP_ACCESS_CONTROL_REQUEST_METHOD:
        request.environ['REQUEST_METHOD'] = HTTP_ACCESS_CONTROL_REQUEST_METHOD

@route('/')
def index():
    noCache()
    return static_file("index.html", root="views")


@route('/api/chat_now', method=('GET', "OPTIONS"))
def api_chat_now():
    allowCROS()
    noCache()
    return {'queue_length': mutex.get_waiting_threads()}



@route('/api/find', method=("POST", "OPTIONS"))
def api_find():
    allowCROS()
    data = request.json
    if not data:
        return '0'
    prompt = data.get('prompt')
    step = data.get('step')
    if step is None:
        step = int(settings.library.step)
    return json.dumps(zhishiku.find(prompt, int(step)))


@route('/chat/completions', method=("POST", "OPTIONS"))
def api_chat_box():
    response.content_type = "text/event-stream"
    response.add_header("Connection", "keep-alive")
    response.add_header("Cache-Control", "no-cache")
    data = request.json
    max_length = data.get('max_tokens')
    if max_length is None:
        max_length = 2048
    top_p = data.get('top_p')
    if top_p is None:
        top_p = 0.2
    temperature = data.get('temperature')
    if temperature is None:
        temperature = 0.8
    use_zhishiku = data.get('zhishiku')
    if use_zhishiku is None:
        use_zhishiku = False
    messages = data.get('messages')
    prompt = messages[-1]['content']
    # print(messages)
    history_formatted = LLM.chat_init(messages)
    response_text = ''
    # print(request.environ)
    IP = request.environ.get(
        'HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    error = ""
    with mutex:
        print("\033[1;32m"+IP+":\033[1;31m"+prompt+"\033[1;37m")
        try:
            for response_text in LLM.chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=use_zhishiku):
                if (response_text):
                    # yield "data: %s\n\n" %response_text
                    yield "data: %s\n\n" % json.dumps({"response": response_text})

            yield "data: %s\n\n" % "[DONE]"
        except Exception as e:
            error = str(e)
            error_print("错误", error)
            response_text = ''
        torch.cuda.empty_cache()
    if response_text == '':
        yield "data: %s\n\n" % json.dumps({"response": ("发生错误，正在重新加载模型"+error)})
        os._exit(0)


@route('/api/chat_stream', method=("POST", "OPTIONS"))
def api_chat_stream():
    allowCROS()
    data = request.json
    if not data:
        return '0'
    prompt = data.get('prompt')
    max_length = data.get('max_length')
    if max_length is None:
        max_length = 2048
    top_p = data.get('top_p')
    if top_p is None:
        top_p = 0.7
    temperature = data.get('temperature')
    if temperature is None:
        temperature = 0.9
    keyword = data.get('keyword')
    if keyword is None:
        keyword = prompt
    history = data.get('history')
    history_formatted = LLM.chat_init(history)
    response = ''
    # print(request.environ)
    IP = request.environ.get(
        'HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    error = ""
    footer = '///'

    with mutex:
        print("\033[1;32m"+IP+":\033[1;31m"+prompt+"\033[1;37m")
        try:
            for response in LLM.chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
                if (response):
                    yield response+footer
        except Exception as e:
            error = str(e)
            error_print("错误", error)
            response = ''
            # raise e
        torch.cuda.empty_cache()
    if response == '':
        yield "发生错误，正在重新加载模型"+error+'///'
        os._exit(0)
    if logging:
        with session_maker() as session:
            jl = 记录(时间=datetime.datetime.now(), IP=IP, 问=prompt, 答=response)
            session.add(jl)
            session.commit()
    print(response)
    yield "/././"


bottle.debug(True)

# import webbrowser
# webbrowser.open_new('http://127.0.0.1:'+str(settings.Port))


bottle.run(server='paste', host="0.0.0.0", port=settings.port, quiet=True)
