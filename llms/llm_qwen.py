from transformers import StoppingCriteriaList
import torch
from transformers import TextIteratorStreamer
from plugins.common import settings
from threading import Thread
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.generation import GenerationConfig


stopping_text = None
if stopping_text:
    stopping_criteria = StoppingCriteriaList(
        [lambda input_ids, scores: tokenizer.decode(input_ids[0]).endswith(stopping_text)])
else:
    stopping_criteria = []


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
    tmp_conver = []
    for i, old_chat in enumerate(history):
        if old_chat['role'] == "user":
            tmp_conver.append(old_chat['content'])
        elif old_chat['role'] == "AI":
            tmp_conver.append(old_chat['content'])
            tmp.append(tmp_conver)
            tmp_conver = []
        else:
            continue
    return tmp


def chat_one(prompt, history, max_length, top_p, temperature, data):
    model.generation_config.top_p=top_p
    model.generation_config.temperature=temperature
    model.generation_config.max_new_tokens=max_length
    for response in model.chat(tokenizer, prompt, history=history, stream=True):
        yield response


def load_model():
    global model, tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        settings.llm.path, trust_remote_code=True)

    # use bf16
    # model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-7B-Chat", device_map="auto", trust_remote_code=True, bf16=True).eval()
    # use fp16
    # model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-7B-Chat", device_map="auto", trust_remote_code=True, fp16=True).eval()
    # use cpu only
    # model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-7B-Chat", device_map="cpu", trust_remote_code=True).eval()
    # use auto mode, automatically select precision based on the device.
    model = AutoModelForCausalLM.from_pretrained(
        settings.llm.path, device_map="auto", trust_remote_code=True).eval()
    
    model.generation_config = GenerationConfig.from_pretrained(settings.llm.path, trust_remote_code=True)  # 可指定不同的生成长度、top_p等相关超参

