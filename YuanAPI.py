import threading
import datetime
from bottle import route, response, request, static_file
import bottle

logging = False
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


当前用户 = ['模型加载中', '', '']


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
    history_formatted = None
    response = ''
    # print(request.environ)
    IP = request.environ.get(
        'HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    global 当前用户
    with mutex:
        yield str(len(prompt))+'字正在计算///'
        try:
            input_text = "用户：" + prompt + "\n小元："
            response = answer(input_text)
        except Exception as e:
            # pass
            print("错误", str(e), e)
        yield response+'///'
    if logging:
        with session_maker() as session:
            jl = 记录(时间=datetime.datetime.now(), IP=IP, 问=prompt, 答=response)
            session.add(jl)
            session.commit()
    print(f"\033[1;32m{IP}:\033[1;31m{prompt}\033[1;37m\n{response}")
    yield "/././"


model = None
tokenizer = None
device = None


def preprocess(text):
    text = text.replace("\n", "\\n").replace("\t", "\\t")
    return text


def postprocess(text):
    return text.replace("\\n", "\n").replace("\\t", "\t").replace('%20', '  ')


def answer(text, sample=True, top_p=1, temperature=0.7):
    '''sample：是否抽样。生成任务，可以设置为True;
    top_p：0-1之间，生成的内容越多样'''
    text = preprocess(text)
    encoding = tokenizer(text=[text], truncation=True, padding=True,
                         max_length=768, return_tensors="pt").to(device)
    if not sample:
        out = model.generate(**encoding, return_dict_in_generate=True,
                             output_scores=False, max_new_tokens=512, num_beams=1, length_penalty=0.6)
    else:
        out = model.generate(**encoding, return_dict_in_generate=True, output_scores=False, max_new_tokens=512,
                             do_sample=True, top_p=top_p, temperature=temperature, no_repeat_ngram_size=12)
    out_text = tokenizer.batch_decode(
        out["sequences"], skip_special_tokens=True)
    return postprocess(out_text[0])


def load_model():
    global model, tokenizer, device
    mutex.acquire()
    from transformers import T5Tokenizer, T5ForConditionalGeneration
    tokenizer = T5Tokenizer.from_pretrained(
        "ChatYuan-large-v2", local_files_only=True)
    model = T5ForConditionalGeneration.from_pretrained(
        "ChatYuan-large-v2", local_files_only=True).half()
    import torch
    device = torch.device('cuda')
    model.to(device)
    mutex.release()
    print("模型加载完成")


thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()


# bottle.debug(True)
bottle.run(server='paste', port=17860, quiet=True)
