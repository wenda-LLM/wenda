import torch
from transformers import TextIteratorStreamer
from plugins.common import settings
from threading import Thread
user = "<human>"
answer = "<bot>"
interface = ":"
gptq = False
if settings.llm.path.lower().find("gptq") > -1:
    print("gptq mode!")
    gptq = True


class ThreadWithReturnValue(Thread):
    def run(self):
        if self._target is not None:
            self._return = self._target(*self._args, **self._kwargs)

    def join(self):
        super().join()
        return self._return


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


def chat_one(prompt, history, max_length, top_p, temperature, data):

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
    if gptq:
        inputs = inputs.input_ids.cuda()
    else:
        inputs = inputs.to('cuda:0')
    yield str(len(prompt))+'字正在计算'
    streamer = TextIteratorStreamer(tokenizer, skip_prompt=True)
    if gptq:
        thread = ThreadWithReturnValue(target=model.generate, kwargs=dict(
            inputs=inputs, max_new_tokens=max_length, temperature=temperature, top_p=top_p, repetition_penalty=1.1, streamer=streamer))
    else:
        thread = ThreadWithReturnValue(target=model.generate, kwargs=dict(
            inputs, max_new_tokens=max_length, temperature=temperature, top_p=top_p, repetition_penalty=1.1, streamer=streamer))
    thread.start()
    generated_text = ""
    for new_text in streamer:
        if new_text != '':
            generated_text += new_text
            yield generated_text.removesuffix("</s>")
    pred = thread.join()
    yield tokenizer.decode(pred.cpu()[0], skip_special_tokens=True)[len(prompt):]


def load_model():
    global model, tokenizer
    from transformers import AutoModelForCausalLM, AutoTokenizer

    if gptq:
        from auto_gptq import AutoGPTQForCausalLM, BaseQuantizeConfig
        tokenizer = AutoTokenizer.from_pretrained(
            settings.llm.path, use_fast=True)
        model = AutoGPTQForCausalLM.from_quantized(settings.llm.path,
                                                   model_basename=settings.llm.basename,
                                                   use_safetensors=True,
                                                   trust_remote_code=False,
                                                   device="cuda:0",
                                                   use_triton=False,
                                                   quantize_config=None)
    else:
        tokenizer = AutoTokenizer.from_pretrained(
            settings.llm.path, trust_remote_code=True, revision="1")
        model = AutoModelForCausalLM.from_pretrained(
            settings.llm.path, trust_remote_code=True,
            low_cpu_mem_usage=True,
            torch_dtype=torch.float16,
            revision="1")
        if not (settings.llm.lora == '' or settings.llm.lora == None):
            print('Lora模型地址', settings.llm.lora)
            from peft import PeftModel
            model = PeftModel.from_pretrained(
                model, settings.llm.lora, adapter_name=settings.llm.lora)
        model = model.cuda()
        model = model.eval()


if not (settings.llm.lora == '' or settings.llm.lora == None):
    from bottle import route, response, request

    @route('/lora_load_adapter', method=("POST", "OPTIONS"))
    def load_adapter():
        # allowCROS()
        try:
            data = request.json
            lora_path = data.get("lora_path")
            adapter_name = data.get("adapter_name")
            model.load_adapter(lora_path, adapter_name=adapter_name)
            return "保存成功"
        except Exception as e:
            return str(e)

    @route('/lora_set_adapter', method=("POST", "OPTIONS"))
    def set_adapter():
        # allowCROS()
        try:
            data = request.json
            adapter_name = data.get("adapter_name")
            model.set_adapter(adapter_name)
            return "保存成功"
        except Exception as e:
            return str(e)
