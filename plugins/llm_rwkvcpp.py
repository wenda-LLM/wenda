from plugins.common import settings
import re

from typing import Optional
import torch
import tokenizers
from plugins.sampling import sample_logits
logits: Optional[torch.Tensor] = None
state: Optional[torch.Tensor] = None

END_OF_LINE_TOKEN: int = 187

def process_tokens(_tokens: list[int], new_line_logit_bias: float = 0.0) -> None:
    global logits, state

    for _token in _tokens:
        logits, state = model.eval(_token, state, state, logits)

    logits[END_OF_LINE_TOKEN] += new_line_logit_bias

def chat_init(history):
    global state,logits
    if settings.llm.historymode!='string':
        if history is not None and len(history) > 0:
            pass
        else:
            state = None
            logits = None
    else:
        tmp = []
        # print(history)
        for i, old_chat in enumerate(history):
            if old_chat['role'] == "user":
                tmp.append(f"{user}{interface} "+old_chat['content'])
            elif old_chat['role'] == "AI":
                tmp.append(f"{bot}{interface} "+old_chat['content'])
            else:
                continue
        history='\n\n'.join(tmp)
        state = None
        logits = None
        return history


def chat_one(prompt, history, max_length, top_p, temperature, zhishiku=False):
    global state,resultChat,token_stop,logits
    token_count = max_length
    presencePenalty = 0.2
    countPenalty = 0.2
    token_stop=[0]

    resultChat = ""

    if zhishiku:
        ctx = "\n\n"+prompt.replace('system:',
                                    'Bob:')\
            .replace('\n\n',"\n")+f"\n\n{bot}{interface}"
        ctx = re.sub('网页', '', ctx)
        ctx = re.sub('原标题：', '', ctx)
    else:
        if prompt.startswith("raw!"):
            print("RWKV raw mode!")
            ctx=prompt.replace("raw!","")
        else:
            ctx = f"\n\n{user}{interface} {prompt}\n\n{bot}{interface}"
    if settings.llm.historymode=='string':
        ctx=history+ctx
    yield str(len(ctx))+'字正在计算'
    new = ctx.strip()
    print(f'{new}', end='')

    process_tokens(tokenizer.encode(new).ids, new_line_logit_bias=-999999999)

    accumulated_tokens: list[int] = []
    token_counts: dict[int, int] = {}

    for i in range(int(token_count)):
        for n in token_counts:
            logits[n] -= presencePenalty + token_counts[n] * countPenalty

        token: int = sample_logits(logits, temperature, top_p)

        if token in token_stop:
            break

        if token not in token_counts:
            token_counts[token] = 1
        else:
            token_counts[token] += 1

        process_tokens([token])

        # Avoid UTF-8 display issues
        accumulated_tokens += [token]

        decoded: str = tokenizer.decode(accumulated_tokens)

        if '\uFFFD' not in decoded:
            resultChat = resultChat + decoded
            if resultChat.endswith('\n\n') or resultChat.endswith(f"{user}{interface}") or resultChat.endswith(f"{bot}{interface}"):
                resultChat = remove_suffix(
                    remove_suffix(
                        remove_suffix(
                            remove_suffix(resultChat, f"{user}{interface}")
                        , f"{bot}{interface}"),
                    '\n'),
                '\n')
                yield resultChat
                break
            yield resultChat
            accumulated_tokens = []


def remove_suffix(input_string, suffix):  # 兼容python3.8
    if suffix and input_string.endswith(suffix):
        return input_string[:-len(suffix)]
    return input_string


interface = ":"
user = "Bob"
bot = "Alice"
model = None
state = None
tokenizer = None

def load_model():
    global model,tokenizer
    
    from plugins.rwkv_cpp_shared_library import load_rwkv_shared_library
    library = load_rwkv_shared_library()
    print(f'System info: {library.rwkv_get_system_info_string()}')
    print('Loading RWKV model')
    from plugins.rwkv_cpp_model import RWKVModel
    model = RWKVModel(library, settings.llm.path,settings.llm.cpu)
    print('Loading 20B tokenizer')
    tokenizer = tokenizers.Tokenizer.from_file(str('20B_tokenizer.json'))
