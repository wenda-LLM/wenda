from plugins.common import settings
import torch

def chat_init(history):
    history_formatted = None
    if history is not None:
        history_formatted = []
        tmp = []
        for i, old_chat in enumerate(history):
            if len(tmp) == 0 and old_chat['role'] == "user":
                tmp.append(old_chat['content'])
            elif old_chat['role'] == "AI" or old_chat['role'] == 'assistant':
                tmp.append(old_chat['content'])
                history_formatted.append(tuple(tmp))
                tmp = []
            else:
                continue
    return history_formatted


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    yield str(len(prompt))+'字正在计算'
    prompt = (
    '''A chat between a curious human and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the human's questions.'''
    f'''###Human: {prompt}###Assistant:'''
)
    with torch.no_grad():
        ret = model.generate(
            **tokenizer(prompt, return_tensors='pt').to('cuda'),
            do_sample=False,
            max_new_tokens=200,
            use_cache=True
        )
        output_ids = ret[0].detach().cpu().numpy().tolist()
        if 100007 in output_ids:
            output_ids = output_ids[:output_ids.index(100007)]
        elif 0 in output_ids:
            output_ids = output_ids[:output_ids.index(0)]
        # 北京之所以成为中国的首都，是因为它在中国历史和文化中的重要地位和政治、经济、文化等方面的影响力。
        yield tokenizer.decode(output_ids)

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
    strategy = ('->'.join([x.strip() for x in settings.llm.strategy.split('->')])).replace('->', ' -> ')
    s = [x.strip().split(' ') for x in strategy.split('->')]
    print(s)
    from transformers import AutoTokenizer, AutoModelForCausalLM

    tokenizer = AutoTokenizer.from_pretrained(settings.llm.path, local_files_only=True,)
    model = AutoModelForCausalLM.from_pretrained(settings.llm.path, local_files_only=True,)
    model = model.half()
    model = model.cuda()
    model = model.eval()
