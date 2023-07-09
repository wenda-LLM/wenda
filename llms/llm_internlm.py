import torch
from transformers.generation.utils import LogitsProcessorList, StoppingCriteriaList, GenerationConfig
from transformers import AutoModelForCausalLM, AutoTokenizer
import warnings
import copy
from typing import List, Optional, Callable, Optional
from dataclasses import dataclass, asdict
import torch.nn as nn
from plugins.common import settings


def chat_init(history):
    tmp = []
    # print(history)
    for i, old_chat in enumerate(history):
        if old_chat['role'] == "user":
            tmp.append(user_prompt.replace("{user}", old_chat['content']))
        elif old_chat['role'] == "AI":
            tmp.append(robot_prompt.replace("{robot}", old_chat['content']))
        else:
            continue
    history = ''.join(tmp)
    return history


def chat_one(prompt, history, max_length, top_p, temperature, data):

    # if prompt.startswith("raw!"):
    #     print("[raw mode]", end="")
    #     prompt = prompt.replace("raw!", "")
    # else:
    #     prompt = f"{user}{interface}{prompt}\n{answer}{interface}"
    generation_config = GenerationConfig(
        max_length=max_length,
        top_p=top_p,
        temperature=temperature,
        repetition_penalty=1.05
    )
    prompt = history + cur_query_prompt.replace("{user}", prompt)
    for i in generate_interactive(prompt, (generation_config),additional_eos_token_id=103028):
        yield i


def load_model():
    global model, tokenizer
    model = AutoModelForCausalLM.from_pretrained(
        settings.llm.path, trust_remote_code=True).to(torch.bfloat16).cuda()
    tokenizer = AutoTokenizer.from_pretrained(
        settings.llm.path, trust_remote_code=True)


@ torch.inference_mode()
def generate_interactive(
    prompt,
    generation_config: Optional[GenerationConfig] = None,
    logits_processor: Optional[LogitsProcessorList] = None,
    stopping_criteria: Optional[StoppingCriteriaList] = None,
    prefix_allowed_tokens_fn: Optional[Callable[[
        int, torch.Tensor], List[int]]] = None,
    additional_eos_token_id: Optional[int] = None,
    **kwargs,
):
    inputs = tokenizer([prompt], padding=True, return_tensors="pt")
    input_length = len(inputs["input_ids"][0])
    for k, v in inputs.items():
        inputs[k] = v.cuda()
    input_ids = inputs["input_ids"]
    batch_size, input_ids_seq_length = input_ids.shape[0], input_ids.shape[-1]
    if generation_config is None:
        generation_config = model.generation_config
    generation_config = copy.deepcopy(generation_config)
    eos_token_id=[additional_eos_token_id]

    # 2. Set generation parameters if not already defined
    logits_processor = logits_processor if logits_processor is not None else LogitsProcessorList()
    stopping_criteria = stopping_criteria if stopping_criteria is not None else StoppingCriteriaList()

    logits_processor = model._get_logits_processor(
        generation_config=generation_config,
        input_ids_seq_length=input_ids_seq_length,
        encoder_input_ids=input_ids,
        prefix_allowed_tokens_fn=prefix_allowed_tokens_fn,
        logits_processor=logits_processor,
    )

    stopping_criteria = model._get_stopping_criteria(
        generation_config=generation_config, stopping_criteria=stopping_criteria
    )
    logits_warper = model._get_logits_warper(generation_config)

    unfinished_sequences = input_ids.new(input_ids.shape[0]).fill_(1)
    scores = None
    model_kwargs = generation_config.update(**kwargs)
    while True:
        model_inputs = model.prepare_inputs_for_generation(
            input_ids, **model_kwargs)
        # forward pass to get next token
        outputs = model(
            **model_inputs,
            return_dict=True,
            output_attentions=False,
            output_hidden_states=False,
        )

        next_token_logits = outputs.logits[:, -1, :]

        # pre-process distribution
        next_token_scores = logits_processor(input_ids, next_token_logits)
        next_token_scores = logits_warper(input_ids, next_token_scores)

        # sample
        probs = nn.functional.softmax(next_token_scores, dim=-1)
        if generation_config.do_sample:
            next_tokens = torch.multinomial(probs, num_samples=1).squeeze(1)
        else:
            next_tokens = torch.argmax(probs, dim=-1)

        # update generated ids, model inputs, and length for next step
        input_ids = torch.cat([input_ids, next_tokens[:, None]], dim=-1)
        model_kwargs = model._update_model_kwargs_for_generation(
            outputs, model_kwargs, is_encoder_decoder=False
        )
        unfinished_sequences = unfinished_sequences.mul(
            (min(next_tokens != i for i in eos_token_id)).long())

        output_token_ids = input_ids[0].cpu().tolist()
        output_token_ids = output_token_ids[input_length:]
        for each_eos_token_id in eos_token_id:
            if output_token_ids[-1] == each_eos_token_id:
                output_token_ids = output_token_ids[:-1]
        response = tokenizer.decode(output_token_ids)

        yield response
        # stop when each sentence is finished, or if we exceed the maximum length
        if unfinished_sequences.max() == 0 or stopping_criteria(input_ids, scores):
            break


user_prompt = "<|User|>:{user}<eoh>\n"
robot_prompt = "<|Bot|>:{robot}<eoa>\n"
cur_query_prompt = "<|User|>:{user}<eoh>\n<|Bot|>:"
