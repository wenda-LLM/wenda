from wudao.api_request import executeEngine, getToken
import os
# 接口API KEY
API_KEY = os.getenv("GLM_API_KEY")
# 公钥
PUBLIC_KEY = os.getenv("GLM_PUBLIC_KEY")
# 能力类型
ability_type = "chatGLM"
# 引擎类型
engine_type = "chatGLM"




def chat_init(history):
    history_data = []
    if history is not None:
        history_data = []
        for i, old_chat in enumerate(history):
                history_data.append(old_chat['content'])
    return history_data


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    # 请求参数样例
    data = {
    "top_p": top_p,
    "temperature": temperature,
    "prompt": prompt,
    "requestTaskNo": "1542097269879345154",
    "history":history_formatted
    }
    token_result = getToken(API_KEY, PUBLIC_KEY)
    if token_result and token_result["code"] == 200:
        token = token_result["data"]
        resp = executeEngine(ability_type, engine_type, token, data)
        yield resp
    else:
        yield "获取token失败，请检查 API_KEY 和 PUBLIC_KEY"
    



def load_model():
     pass
