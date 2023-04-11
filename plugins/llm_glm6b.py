from plugins import settings
import os


def chat_init(history):
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
    return history_formatted


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    for response, history in model.stream_chat(tokenizer, prompt, history_formatted,
                                               max_length=max_length, top_p=top_p, temperature=temperature):
        yield response


def load_model():
    global model, tokenizer
    from transformers import AutoModel, AutoTokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        settings.glm_path, local_files_only=True, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        settings.glm_path, local_files_only=True, trust_remote_code=True)
    if not (settings.glm_lora_path == '' or settings.glm_lora_path == None):
        print('glm_lora_path模型地址', settings.glm_lora_path)
        from peft import PeftModel
        model = PeftModel.from_pretrained(model, settings.glm_lora_path)
    for strategy in settings.glm_strategy.split():
        # 根据设备执行不同的操作
        if strategy == 'cpu':
            # 如果是cpu，不做任何操作
            pass
        elif strategy == 'cuda':
            # 如果是gpu，把模型移动到显卡
            model = model.cuda()
        else:
            # 根据精度执行不同的操作
            if strategy == 'fp16':
                # 如果是fp16，把模型转化为半精度
                model = model.half()
            elif strategy == 'fp32':
                # 如果是fp32，把模型转化为全精度
                model = model.float()
            elif strategy.startswith('fp16i'):
                # 如果是fp16i开头，把模型转化为指定的精度
                # 从字符串中提取精度的数字部分
                bits = int(strategy[5:])
                # 调用quantize方法，传入精度参数
                model = model.quantize(bits)
                model = model.half()
            else:
                # 如果是其他精度，报错并退出程序
                print('参数错误：', strategy)
                exit()
    model = model.eval()
