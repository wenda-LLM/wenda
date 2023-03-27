import threading
import datetime
from bottle import route, response, request,static_file
import bottle
logging=True
if logging:
    from defineSQL import session_maker, 记录
mutex = threading.Lock()

@route('/static/:name')
def staticjs(name='-'):
    return static_file(name, root="views\static")
@route('/:name')
def static(name='-'):
    return static_file(name, root="views")
@route('/')
def index():
    return static_file("index.html", root="views")
当前用户=None
@route('/api/chat_now', method='GET')
def api_chat_now():
    return '当前用户：'+当前用户[0]+"\n问题："+当前用户[1]+"\n回答："+当前用户[2]+''

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
    history = data.get('history')
    history_formatted = None
    if history is not None:
        history_formatted = []
        tmp = []
        for i, old_chat in enumerate(history):
            if len(tmp) == 0 and old_chat['role'] == "user":
                tmp.append(old_chat['content'])
            elif old_chat['role'] == "AI":
                tmp.append(old_chat['content'])
                history_formatted.append(tuple(tmp))
                tmp = []
            else:
                continue
    response=''
    # print(request.environ)
    IP=request.environ.get('HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    global 当前用户
    with mutex:
        yield str(len(prompt))+'字正在计算///'
        try:
            for response, history in model.stream_chat(tokenizer, prompt, history_formatted, max_length=max_length, top_p=top_p,temperature=temperature):
                当前用户=[IP,prompt,response]
                if(response):yield response+'///'
        except Exception as e:
            # pass
            print("错误",str(e),e)
            yield "发生错误，正在重新加载模型"+str(e)+'///'
            thread_load_model = threading.Thread(target=load_model)
            thread_load_model.start()
    if response=='':
            yield "疑似显存不足，正在重新加载模型"+'///'
            thread_load_model = threading.Thread(target=load_model)
            thread_load_model.start()
    if logging:
        with session_maker() as session:
            jl = 记录(时间=datetime.datetime.now(),IP=IP,问= prompt,答=response)
            session.add(jl)
            session.commit()
    print( f"\033[1;32m{IP}:\033[1;31m{prompt}\033[1;37m\n{response}")
    yield "/././"
model=None
tokenizer=None
def load_model():
    global model,tokenizer,当前用户
    mutex.acquire()
    当前用户=['模型加载中','','']
    from transformers import AutoModel, AutoTokenizer
    model_path="model/chatglm-6b-int4"
    tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True, trust_remote_code=True)
    model = AutoModel.from_pretrained(model_path, local_files_only=True, trust_remote_code=True)
    model = model.half()
    model = model.cuda()
    model = model.eval()
    mutex.release()
thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()


# bottle.debug(True)
bottle.run(server='paste',port=17860,quiet=True)
