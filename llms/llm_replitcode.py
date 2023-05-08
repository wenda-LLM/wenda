from plugins.common import settings

def chat_init(history):
    return []


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    yield str(len(prompt))+'字正在计算'
    
    x = tokenizer.encode(prompt, return_tensors='pt').to(model.device)
    y = model.generate(x, max_length=200, do_sample=True, top_p=0.95, top_k=4, temperature=0.2, num_return_sequences=1, eos_token_id=tokenizer.eos_token_id)

# decoding, clean_up_tokenization_spaces=False to ensure syntactical correctness
    response = tokenizer.decode(y[0], skip_special_tokens=True, clean_up_tokenization_spaces=False)
    yield response

def load_model():
    global model, tokenizer
    from transformers import AutoModelForCausalLM, AutoTokenizer
    import torch
    tokenizer = AutoTokenizer.from_pretrained(
        settings.llm.path, local_files_only=True, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        settings.llm.path, local_files_only=True, trust_remote_code=True)
    device, precision = settings.llm.strategy.split()
# 根据设备执行不同的操作
    if device == 'cpu':
        # 如果是cpu，不做任何操作
        pass
    elif device == 'cuda':
        # 如果是gpu，把模型移动到显卡
        import torch

        # 根据精度执行不同的操作
        if precision == 'fp16':
            # 如果是fp16，把模型转化为半精度
            model = model.half()
        elif precision == 'fp32':
            # 如果是fp32，把模型转化为全精度
            model = model.float()
        elif precision.startswith('fp16i'):
            # 如果是fp16i开头，把模型转化为指定的精度
            # 从字符串中提取精度的数字部分
            bits = int(precision[5:])
            # 调用quantize方法，传入精度参数
            model = model.quantize(bits)
            model = model.half()
        elif precision.startswith('fp32i'):
            # 如果是fp32i开头，把模型转化为指定的精度
            # 从字符串中提取精度的数字部分
            bits = int(precision[5:])
            # 调用quantize方法，传入精度参数
            model = model.quantize(bits)
            model = model.float()
        else:
            # 如果是其他精度，报错并退出程序
            print('Error: 不受支持的精度')
            exit()
        model = model.to(torch.device("cuda"))    
    else:
        # 如果是其他设备，报错并退出程序
        print('Error: 不受支持的设备')
        exit()
    

   
    model = model.eval()
    
