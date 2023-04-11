import torch
import threading
import os
import json
import datetime
from bottle import route, response, request, static_file, hook
import bottle

from plugins import settings
LLM = settings.load_LLM()
if settings.logging:
    from plugins.defineSQL import session_maker, 记录
mutex = threading.Lock()


@route('/static/<path:path>')
def staticjs(path='-'):
    return static_file(path, root="views/static/")


@route('/:name')
def static(name='-'):
    return static_file(name, root="views")


@route('/')
def index():
    response.set_header("Pragma", "no-cache")
    response.add_header("Cache-Control", "must-revalidate")
    response.add_header("Cache-Control", "no-cache")
    response.add_header("Cache-Control", "no-store")
    return static_file("index.html", root="views")


当前用户 = None


@route('/api/chat_now', method='GET')
def api_chat_now():
    return '当前状态：'+当前用户[0]


@hook('before_request')
def validate():
    REQUEST_METHOD = request.environ.get('REQUEST_METHOD')
    HTTP_ACCESS_CONTROL_REQUEST_METHOD = request.environ.get(
        'HTTP_ACCESS_CONTROL_REQUEST_METHOD')
    if REQUEST_METHOD == 'OPTIONS' and HTTP_ACCESS_CONTROL_REQUEST_METHOD:
        request.environ['REQUEST_METHOD'] = HTTP_ACCESS_CONTROL_REQUEST_METHOD


@route('/api/save_news', method='OPTIONS')
@route('/api/save_news', method='POST')
def api_chat_stream():
    response.set_header('Access-Control-Allow-Origin', '*')
    response.add_header('Access-Control-Allow-Methods', 'POST,OPTIONS')
    response.add_header('Access-Control-Allow-Headers',
                        'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token')
    try:
        data = request.json
        if not data:
            return '0'
        title = data.get('title')
        txt = data.get('txt')
        cut_file = f"txt/{title}.txt"
        with open(cut_file, 'w', encoding='utf-8') as f:
            f.write(txt)
            f.close()
        return '1'
    except Exception as e:
        print(e)
    return '2'


@route('/api/find', method='POST')
def api_find():
    data = request.json
    prompt = data.get('prompt')
    return json.dumps(zhishiku.find(prompt))


@route('/chat/completions', method='POST')
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
    global 当前用户
    error = ""
    with mutex:
        yield "data: %s\n\n" %json.dumps({"response": (str(len(prompt))+'字正在计算')})

        print("\033[1;32m"+IP+":\033[1;31m"+prompt+"\033[1;37m")
        try:
            for response_text in LLM.chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=use_zhishiku):
                if (response_text):
                    # yield "data: %s\n\n" %response_text
                    yield "data: %s\n\n" %json.dumps({"response": response_text})
            
            yield "data: %s\n\n" %"[DONE]"
        except Exception as e:
            error = str(e)
            print("错误", settings.red, error, settings.white)
            response_text = ''
        torch.cuda.empty_cache()
    if response_text == '':
        yield "data: %s\n\n" %json.dumps({"response": ("发生错误，正在重新加载模型"+error)})
        os._exit(0)
@route('/api/chat_stream', method='POST')
def api_chat_stream():
    data = request.json
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
    use_zhishiku = data.get('zhishiku')
    if use_zhishiku is None:
        use_zhishiku = False
    history = data.get('history')
    history_formatted = LLM.chat_init(history)
    response = ''
    # print(request.environ)
    IP = request.environ.get(
        'HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    global 当前用户
    error = ""
    with mutex:
        footer = '///'
        yield str(len(prompt))+'字正在计算'
        if use_zhishiku:
            # print(keyword)
            response_d = zhishiku.find(prompt)
            torch.cuda.empty_cache()
            output_sources = [i['title'] for i in response_d]
            results = '\n---\n'.join([i['content'] for i in response_d])
            prompt = 'system:学习以下文段, 用中文回答用户问题。如果无法从中得到答案，忽略文段内容并用中文回答用户问题。\n\n' + \
                results+'\nuser:'+prompt
            if settings.zsk_show_soucre:
                footer = "\n来源：\n"+('\n').join(output_sources)+'///'
        yield footer

        print("\033[1;32m"+IP+":\033[1;31m"+prompt+"\033[1;37m")
        try:
            for response in LLM.chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=use_zhishiku):
                if (response):
                    yield response+footer
        except Exception as e:
            error = str(e)
            print("错误", settings.red, error, settings.white)
            response = ''
        torch.cuda.empty_cache()
    if response == '':
        yield "发生错误，正在重新加载模型"+error+'///'
        os._exit(0)
    if settings.logging:
        with session_maker() as session:
            jl = 记录(时间=datetime.datetime.now(), IP=IP, 问=prompt, 答=response)
            session.add(jl)
            session.commit()
    print(response)
    yield "/././"


model = None
tokenizer = None


def load_model():
    global 当前用户
    mutex.acquire()
    当前用户 = ['模型加载中', '', '']
    LLM.load_model()
    mutex.release()
    torch.cuda.empty_cache()
    print(settings.green, "模型加载完成", settings.white)


thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()
zhishiku = None


def load_zsk():
    global zhishiku
    zhishiku = settings.load_zsk()
    print(settings.green, "知识库加载完成", settings.white)


thread_load_zsk = threading.Thread(target=load_zsk)
thread_load_zsk.start()
bottle.debug(True)
bottle.run(server='paste', host="0.0.0.0", port=settings.port, quiet=True)
