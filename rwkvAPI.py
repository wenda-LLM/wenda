import threading
import settings
import datetime
from bottle import route, response, request,static_file
import bottle
import torch

if settings.logging:
    from defineSQL import session_maker, 记录
mutex = threading.Lock()

interface = ":"
user = "Bob"
bot = "Alice"


@route('/static/<path:path>')
def staticjs(path='-'):
    return static_file(path, root="views/static/")
@route('/:name')
def static(name='-'):
    return static_file(name, root="views")
@route('/')
def index():
    return static_file("index.html", root="views")
当前用户=['模型加载中','','']
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
    global state
    history = data.get('history')
    if history is not None and  len(history)>0:
        pass
    else:
        state=None
        # tmp = []
        # for i, old_chat in enumerate(history):
        #     if old_chat['role'] == "user":
        #         tmp.append(f"{user}{interface}"+old_chat['content'])
        #     elif old_chat['role'] == "AI":
        #         tmp.append(f"{bot}{interface}"+old_chat['content'])
        #     else:
        #         continue
        # history='\n'.join(tmp)
    use_zhishiku = data.get('zhishiku')
    if use_zhishiku is None:
        use_zhishiku = False
    response=''
    IP=request.environ.get('HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    global 当前用户
    with mutex:
        yield str(len(prompt))+'字正在计算///'
        # try:
        token_count=max_length
        presencePenalty = 0.1
        countPenalty = 0.1
        args = PIPELINE_ARGS(temperature = max(0.2, float(temperature)), top_p = float(top_p),
                    alpha_frequency = countPenalty,
                    alpha_presence = presencePenalty,
                    token_ban = [], # ban the generation of some tokens
                    token_stop = [0]) # stop generation whenever you see any token here
        if use_zhishiku:
            response_d=zhishiku.find(prompt)
            output_sources = [i['title'] for i in response_d]
            results ='\n---\n'.join([i['content'] for i in response_d])
            ctx=   f'system:根据以下资料, 用中文回答问题\n\n'+results+f"\n{user}{interface}{prompt}\n{bot}{interface}"
            footer=  "\n来源：\n"+('\n').join(output_sources)+'///'
            yield '正在计算'+footer
            torch.cuda.empty_cache() 
        else:
            footer=  '///'
            ctx = f"\n{user}{interface}{prompt}\n{bot}{interface}"
        all_tokens = []
        out_last = 0
        response = ''
        occurrence = {}
        print( f"\033[1;32m{IP}:\033[1;31m{ctx}\033[1;37m",end='')
        for i in range(int(token_count)):
            out, state = model.forward(pipeline.encode(ctx)[-ctx_limit:] if i == 0 else [token], state)
            for n in args.token_ban:
                out[n] = -float('inf')
            for n in occurrence:
                out[n] -= (args.alpha_presence + occurrence[n] * args.alpha_frequency)

            token = pipeline.sample_logits(out, temperature=args.temperature, top_p=args.top_p)
            if token in args.token_stop:
                break
            all_tokens += [token]
            if token not in occurrence:
                occurrence[token] = 1
            else:
                occurrence[token] += 1
            
            tmp = pipeline.decode(all_tokens[out_last:])
            if '\ufffd' not in tmp:
                response += tmp
                if  response.endswith('\n\n') or response.endswith(f"{user}{interface}"):
                    response = response.removesuffix(f"{user}{interface}").removesuffix('\n').removesuffix('\n')
                    break
                print(tmp,end='')
                yield response.strip()+footer
                out_last = i + 1
        yield response.strip()+footer
        # except Exception as e:
        #     # pass
        #     print("错误",str(e),e)
    if settings.logging:
        with session_maker() as session:
            jl = 记录(时间=datetime.datetime.now(),IP=IP,问= prompt,答=response)
            session.add(jl)
            session.commit()
   
    yield "/././"
pipeline=None
PIPELINE_ARGS=None
model=None
ctx_limit = 1024
state = None
def load_model():
    global pipeline,PIPELINE_ARGS,model
    mutex.acquire()
    import os
    import numpy as np
    np.set_printoptions(precision=4, suppress=True, linewidth=200)
    os.environ['RWKV_JIT_ON'] = '1'
    os.environ["RWKV_CUDA_ON"] = '0' # '1' to compile CUDA kernel (10x faster), requires c++ compiler & cuda libraries

    from rwkv.model import RWKV # pip install rwkv
    model = RWKV(model=settings.rwkv_path,
     strategy=settings.rwkv_strategy)


    from rwkv.utils import PIPELINE, PIPELINE_ARGS
    pipeline = PIPELINE(model, "20B_tokenizer.json")
    mutex.release()
    print("模型加载完成")
thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()
import zhishiku

# bottle.debug(True)
bottle.run(server='paste',host="0.0.0.0",port=17860,quiet=True)

