from peft import PeftModel
from plugins.common import settings

user = "<human>"
answer = "<bot>"
interface = ":"


def chat_init(history):
    tmp = []
    # print(history)
    for i, old_chat in enumerate(history):
        if old_chat['role'] == "user":
            tmp.append(f"{user}{interface}"+old_chat['content'])
        elif old_chat['role'] == "AI":
            tmp.append(f"{answer}{interface}"+old_chat['content'])
        else:
            continue
    history = '\n'.join(tmp)
    return history


def chat_one(prompt, history, max_length, top_p, temperature, zhishiku=False):

    if prompt.startswith("raw!"):
        print("[raw mode]", end="")
        prompt = prompt.replace("raw!", "")
    else:
        prompt = f"{user}{interface}{prompt}\n{answer}{interface}"
    if history is None:
        history = ""
    else:
        history += '\n'
    prompt = history+prompt
    inputs = tokenizer(prompt, return_tensors='pt')
    yield str(len(prompt))+'字正在计算'
    inputs = inputs.to('cuda:0')
    pred = model.generate(
        **inputs, max_new_tokens=max_length, repetition_penalty=1.1)
    yield tokenizer.decode(pred.cpu()[0], skip_special_tokens=True)[len(prompt):]

# def sum_values(dict):
#     total = 0
#     for value in dict.values():
#         total += value
#     return total

# def dict_to_list(d):
#     l = []
#     for k, v in d.items():
#         l.extend([k] * v)
#     return l


def load_model():
    global model, tokenizer
    from transformers import AutoModelForCausalLM, AutoTokenizer

    tokenizer = AutoTokenizer.from_pretrained(
        settings.llm.path, trust_remote_code=True, revision="1")
    model = AutoModelForCausalLM.from_pretrained(
        settings.llm.path, trust_remote_code=True, revision="1")
    model = model.half()
    if not (settings.llm.lora == '' or settings.llm.lora == None):
        print('Lora模型地址', settings.llm.lora)
        from peft import PeftModel
        model = PeftModel.from_pretrained(
            model, settings.llm.lora, adapter_name=settings.llm.lora)
    model = model.cuda()
    model = model.eval()
