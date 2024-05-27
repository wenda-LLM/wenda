from threading import Thread
from plugins.common import settings
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    StoppingCriteria,
    StoppingCriteriaList,
    TextIteratorStreamer,
)


class StopOnTokens(StoppingCriteria):
    def __call__(
            self, input_ids: torch.LongTensor, scores: torch.FloatTensor, **kwargs
    ) -> bool:
        stop_ids = (
            [2, 6, 7, 8],
        )  # "<|endoftext|>", "<|im_start|>", "<|im_end|>", "<|im_sep|>"
        for stop_id in stop_ids:
            if input_ids[0][-1] == stop_id:
                return True
        return False


def chat_init(history):
    messages = []
    if history is not None:
        for idx, msg in enumerate(history):
            if msg['role'] == 'user':
                messages.append({"role": "user", "content": msg['content']})
            if msg['role'] == 'AI':
                messages.append({"role": "assistant", "content": msg['content']})

    return messages


def load_model():
    global model, tokenizer
    tokenizer = AutoTokenizer.from_pretrained(
        settings.llm.path, trust_remote_code=True
    )

    model = AutoModelForCausalLM.from_pretrained(
        settings.llm.path,
        device_map="auto",
        torch_dtype="auto",
        trust_remote_code=True,
    ).eval()


def chat_one(prompt, history, max_length, top_p, temperature, data):
    stop = StopOnTokens()
    history.append({"role": "user", "content": prompt})
    model_inputs = tokenizer.apply_chat_template(
        history, add_generation_prompt=True, tokenize=True, return_tensors="pt"
    ).to(next(model.parameters()).device)
    streamer = TextIteratorStreamer(
        tokenizer, timeout=60, skip_prompt=True, skip_special_tokens=True
    )
    generate_kwargs = {
        "input_ids": model_inputs,
        "streamer": streamer,
        "max_new_tokens": max_length,
        "do_sample": True,
        "top_p": top_p,
        "temperature": temperature,
        "stopping_criteria": StoppingCriteriaList([stop]),
        "repetition_penalty": 1.2,
    }
    t = Thread(target=model.generate, kwargs=generate_kwargs)
    t.start()

    output = ""
    for new_token in streamer:
        if new_token != "":
            output += new_token
            yield output
