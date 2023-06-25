from wudao.api_request import executeEngine, getToken
from plugins.common import settings
import os
# 能力类型
ability_type = "chatGLM"
# 引擎类型
engine_type = "chatGLM"
Api_key=''
Public_key=''
if os.environ['GLM_API_KEY']:
    Api_key=os.environ['GLM_API_KEY']
    Public_key=os.environ['GLM_Public_key']
else:
    Api_key=settings.Api_key
    Public_key=settings.Public_key
     

def chat_init(history):
    history_data = []
    if history is not None:
        history_data = []
        for i, old_chat in enumerate(history):
                history_data.append(old_chat['content'])
    return history_data


def chat_one(prompt, history_formatted, max_length, top_p, temperature, data):
    # 请求参数样例
    data = {
    "top_p": top_p,
    "temperature": temperature,
    "prompt": prompt,
    "requestTaskNo": "1542097269879345154",
    "history":history_formatted
    }
    token_result = getToken(Api_key, Public_key)
    if token_result and token_result["code"] == 200:
        token = token_result["data"]
        resp = executeEngine(ability_type, engine_type, token, data)
        print(resp)
        if resp[ 'success']!=False:
            yield resp['data']['outputText']
        else:
            yield resp['msg']
    else:
        yield "获取token失败，请检查 API_KEY 和 PUBLIC_KEY"


def load_model():
     pass


class Lock:
    def __init__(self):
        pass

    def get_waiting_threads(self):
        return 0

    def __enter__(self): 
        pass

    def __exit__(self, exc_type, exc_val, exc_tb): 
        pass