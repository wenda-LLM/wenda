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
    tmp = [
        {"role": "system", "content": "You are a helpful assistant."},
    ]
    # print(history)
    for i, old_chat in enumerate(history):
        if old_chat['role'] == "user":
            tmp.append({"role": "user", "content": old_chat['content']})
        elif old_chat['role'] == "AI":
            tmp.append({"role": "assistant", "content": old_chat['content']})
        else:
            continue
    return tmp


def chat_one(prompt, history, max_length, top_p, temperature, data):
    messages = history
    messages.append({"role": "user", "content": prompt})
    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    model_inputs = tokenizer([text], return_tensors="pt").to('cuda')

    generated_ids = model.generate(
        model_inputs.input_ids,
        max_new_tokens=max_length
    )
    generated_ids = [
        output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]

    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)
    yield(response[0])


def load_model():
    global model, tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        settings.llm.path, trust_remote_code=True)

    model = AutoModelForCausalLM.from_pretrained(
        settings.llm.path,
        torch_dtype="auto",
        device_map="auto")
    