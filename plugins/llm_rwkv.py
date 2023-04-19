from plugins.settings import settings


def chat_init(history):
    global state
    if settings.HistoryMode!='string':
        if history is not None and len(history) > 0:
            pass
        else:
            state = None
    else:
        tmp = []
        for i, old_chat in enumerate(history):
            if old_chat['role'] == "user":
                tmp.append(f"\n\n{user}{interface}"+old_chat['content'])
            elif old_chat['role'] == "AI":
                tmp.append(f"\n\n{bot}{interface}"+old_chat['content'])
            else:
                continue
        history='\n'.join(tmp)
        state = None
        return history


def chat_one(prompt, history, max_length, top_p, temperature, zhishiku=False):
    global state
    token_count = max_length
    presencePenalty = 0.2
    countPenalty = 0.2
    args = PIPELINE_ARGS(temperature=max(0.2, float(temperature)), top_p=float(top_p),
                         alpha_frequency=countPenalty,
                         alpha_presence=presencePenalty,
                         token_ban=[],  # ban the generation of some tokens
                         token_stop=[0])  # stop generation whenever you see any token here

    if zhishiku:
        ctx = "\n\n"+prompt.replace('system',user).replace('\n\n',"\n").replace('user:',"问:")+f"\n\n{bot}{interface}"
    else:
        ctx = f"\n\n{user}{interface} {prompt}\n\n{bot}{interface}"
    if settings.HistoryMode=='string':
        ctx=history+ctx
    all_tokens = []
    out_last = 0
    response = ''
    occurrence = {}
    for i in range(int(token_count)):
        out, state = model.forward(pipeline.encode(
            ctx) if i == 0 else [token], state)
        for n in args.token_ban:
            out[n] = -float('inf')
        for n in occurrence:
            out[n] -= (args.alpha_presence + occurrence[n]
                       * args.alpha_frequency)

        token = pipeline.sample_logits(
            out, temperature=args.temperature, top_p=args.top_p)
        if token in args.token_stop:
            break
        all_tokens += [token]
        if token not in occurrence:
            occurrence[token] = 1
        else:
            occurrence[token] += 1

        tmp = pipeline.decode(all_tokens[out_last:])
        if '\ufffd' not in tmp:
            response += tmp
            if response.endswith('\n\n') or response.endswith(f"{user}{interface}") or response.endswith(f"{bot}{interface}"):
                response = remove_suffix(
                    remove_suffix(
                        remove_suffix(
                            remove_suffix(response, f"{user}{interface}")
                        , f"{bot}{interface}"),
                    '\n'),
                '\n')
                break
            print(tmp, end='')
            out_last = i + 1
            yield response.strip()


def remove_suffix(input_string, suffix):  # 兼容python3.8
    if suffix and input_string.endswith(suffix):
        return input_string[:-len(suffix)]
    return input_string


interface = ":"
user = "Bob"
bot = "Alice"
pipeline = None
PIPELINE_ARGS = None
model = None
state = None


def load_model():
    global pipeline, PIPELINE_ARGS, model
    import os
    os.environ['RWKV_JIT_ON'] = '1'
    if (os.environ.get('RWKV_CUDA_ON') == '' or os.environ.get('RWKV_CUDA_ON') == None):
        os.environ["RWKV_CUDA_ON"] = '0'
        # '1' to compile CUDA kernel (10x faster), requires c++ compiler & cuda libraries

    from rwkv.model import RWKV  # pip install rwkv
    model = RWKV(model=settings.Path, strategy=settings.Strategy)
    # if settings.rwkv_lora_path == '':
    # else:
    #     with torch.no_grad():

    from rwkv.utils import PIPELINE, PIPELINE_ARGS
    pipeline = PIPELINE(model, "20B_tokenizer.json")
