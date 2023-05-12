
import threading
import torch
from plugins.common import success_print
from plugins.common import CounterLock
from plugins.common import settings

# -------------------   加载大模型 -----------------------
"""
LLM: 模型模块变量
model: 实例化模型变量
"""

def load_LLM():
    try:
        from importlib import import_module
        LLM = import_module('llms.llm_' + settings.llm_type)
        return LLM
    except Exception as e:
        print("LLM模型加载失败，请阅读说明：https://github.com/l15y/wenda", e)


LLM = load_LLM()



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

# --------------- 知识库 ----------------------------
zhishiku = None

def load_zsk():
    try:
        from importlib import import_module
        global zhishiku
        import plugins.zhishiku as zsk
        zhishiku = zsk
        success_print("知识库加载完成")
    except Exception as e:
        print('知识库加载失败，请阅读说明', r"https://github.com/l15y/wenda#%E7%9F%A5%E8%AF%86%E5%BA%93")
        # error_helper(
        #     "知识库加载失败，请阅读说明", r"https://github.com/l15y/wenda#%E7%9F%A5%E8%AF%86%E5%BA%93")
        raise e


thread_load_zsk = threading.Thread(target=load_zsk)
thread_load_zsk.start()