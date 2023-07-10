import torch
from plugins.common import settings
import time
from copy import deepcopy
import threading
import time
import math
import re
from typing import List,Dict
interface = ":"
if settings.llm.path.lower().find("chntuned") > -1:
    print("RWKV CHNtuned mode")
    tokenizers_type = "world"
    user = "User"
    answer = "Assistant"
    tokenizers_file = "rwkv_vocab_v20230424"
elif settings.llm.path.lower().find("world") > -1:
    print("RWKV world mode")
    tokenizers_type = "world"
    user = "Question"
    answer = "Answer"
    tokenizers_file = "rwkv_vocab_v20230424"
else:
    tokenizers_type = "20B"
    user = "Bob"
    answer = "Alice"
    tokenizers_file = "20B_tokenizer.json"

states = {}

presencePenalty = 0.2
countPenalty = 0.2
if settings.llm.presence_penalty:
    presencePenalty=settings.llm.presence_penalty
if settings.llm.count_penalty:
    countPenalty=settings.llm.count_penalty

class State(object):
    def __init__(self, state):
        self.state = [tensor.cpu() for tensor in state] if device != "cpu" else state
        self.touch()

    def get(self):
        self.touch()
        return [tensor.to(device) for tensor in self.state] if device != "cpu" else deepcopy(self.state)

    def touch(self):
        self.time = time.time()


def gc_states():
    while True:
        time.sleep(3)
        if len(states) > 1000:
            oldest = [math.inf, '']
            for i in states:
                if states[i].time < oldest[0]:
                    oldest = [states[i].time, i]
            del states[oldest[1]]


thread_load_model = threading.Thread(target=gc_states)
thread_load_model.start()

device = settings.llm.state_source_device or 'cpu'
if settings.llm.strategy.startswith("Q"):
    runtime = "cpp"

    from typing import Optional
    import tokenizers
    from llms.rwkvcpp.sampling import sample_logits
    from llms.rwkvcpp.rwkv_tokenizer import get_tokenizer
    logits: Optional[torch.Tensor] = None
    state: Optional[torch.Tensor] = None

    END_OF_LINE_TOKEN: int = 187

    def process_tokens(_tokens: List[int], new_line_logit_bias: float = 0.0) -> None:
        global logits, state

        for _token in _tokens:
            logits, state = model.eval(_token, state, state, logits)

        logits[END_OF_LINE_TOKEN] += new_line_logit_bias

    def chat_init(history):
        global state, logits
        if settings.llm.historymode != 'string':
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
                    tmp.append(f"{answer}{interface} "+old_chat['content'])
                else:
                    continue
            history = '\n\n'.join(tmp)
            state = None
            logits = None
            return history

    def chat_one(prompt, history, max_length, top_p, temperature, data):
        global state, resultChat, token_stop, logits
        token_count = max_length
        token_stop = [0]

        resultChat = ""

        if prompt.startswith("raw!"):
            print("[RWKV raw mode]", end="")
            ctx = prompt.replace("raw!", "")
        else:
            ctx = f"\n\n{user}{interface} {prompt}\n\n{answer}{interface}"
        if settings.llm.historymode == 'string':
            ctx = history+ctx
        yield str(len(ctx))+'字正在计算'
        new = ctx.strip()
        print(f'{new}', end='')

        process_tokens(tokenizer_encode(new),
                       new_line_logit_bias=-999999999)

        accumulated_tokens: List[int] = []
        token_counts: Dict[int, int] = {}

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
                if resultChat.endswith('\n\n') or resultChat.endswith(f"{user}{interface}") or resultChat.endswith(f"{answer}{interface}"):
                    resultChat = remove_suffix(
                        remove_suffix(
                            remove_suffix(
                                remove_suffix(resultChat, f"{user}{interface}"), f"{answer}{interface}"),
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

    model = None
    state = None
    tokenizer_encode = None

    def load_model():
        global model, tokenizer, tokenizer_encode


        from llms.rwkvcpp.rwkv_cpp_shared_library import load_rwkv_shared_library
        library = load_rwkv_shared_library()
        print(f'System info: {library.rwkv_get_system_info_string()}')
        print('Loading RWKV model')
        from llms.rwkvcpp.rwkv_cpp_model import RWKVModel
        try:
            cpu_count = int(settings.llm.strategy.split('->')[1])
            model = RWKVModel(library, settings.llm.path, cpu_count)
        except:
            model = RWKVModel(library, settings.llm.path)
        #print('Loading 20B tokenizer')
        #tokenizer = tokenizers.Tokenizer.from_file(tokenizers_file)
        tokenizer , tokenizer_encode = get_tokenizer(tokenizers_type)


else:
    runtime = "torch"

    def chat_init(history):
        tmp = []
        # print(history)
        raw_mode=False
        for i, old_chat in enumerate(history):
            if old_chat['role'] == "user":
                if old_chat['content'].startswith("raw!"):
                    raw_mode=True
                    tmp.append(old_chat['content'])
                else:
                    raw_mode=False
                    tmp.append(f"{user}{interface} "+old_chat['content'])
            elif old_chat['role'] == "AI":
                if raw_mode:
                    tmp[-1]+=old_chat['content']
                else:
                    tmp.append(f"{answer}{interface} "+old_chat['content'])
            else:
                continue
        history = '\n\n'.join(tmp)
        return history

    def chat_one(prompt, history, max_length, top_p, temperature, data):
        token_count = max_length
        if history is None or history == "":
            history = ""
        else:
            history = history+'\n\n'
        args = PIPELINE_ARGS(temperature=max(0.2, float(temperature)), top_p=float(top_p),
                             alpha_frequency=countPenalty,
                             alpha_presence=presencePenalty,
                             token_ban=[],  # ban the generation of some tokens
                             token_stop=[0])  # stop generation whenever you see any token here

        if prompt.startswith("raw!"):
            print("[raw mode]", end="")
            ctx = prompt.replace("raw!", "")
            ctx = re.sub('\\{user\\}',user, ctx)
            ctx = re.sub('\\{answer\\}',answer, ctx)
            ctx = re.sub('\\{bot\\}',answer, ctx)
            ctx = re.sub('\\{interface\\}',interface, ctx)
            raw_mode=True
        else:
            ctx = f"{user}{interface} {prompt}\n\n{answer}{interface}"
            raw_mode=False
        # print(ctx)
        state = None
        history_in_ctx=False
        try:
            state = states[history].get()
            print("[match state]", end="")
        except Exception as e:
            ctx = history+ctx
            history_in_ctx=True
            print("[default stste]", end="")
            if not raw_mode:
                state = states['default'].get()
            # print([history],states)
        all_tokens = []
        out_last = 0
        occurrence = {}
        tokens = pipeline.encode(ctx)
        response = ''
        yield str(len(ctx))+'字正在计算\n'+str(len(tokens))+" tokens"
        for i in range(int(token_count)):
            out, state = model.forward(tokens if i == 0 else [token], state)
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
            for occurrence_i in occurrence:
                occurrence[occurrence_i]*=0.996
            if token not in occurrence:
                occurrence[token] = 1
            else:
                occurrence[token] += 1

            tmp = pipeline.decode(all_tokens[out_last:])
            if '\ufffd' not in tmp:
                response += tmp
                if response.endswith('\n\n') or response.endswith(f"{user}{interface}"):
                    response = remove_suffix(
                        remove_suffix(response, '\n\n'),
                        f"{user}{interface}"
                    )
                    break
                # print(tmp, end='')
                out_last = i + 1
                yield response.strip()
        yield response.strip()
        if raw_mode:
            if not history_in_ctx:
                prompt=history+prompt
            states[prompt+response.strip()+'\n\n'] = State(state)
        else:
            if not history_in_ctx:
                ctx=history+ctx
            states[ctx+' '+response.strip()+'\n\n'] = State(state)

    def remove_suffix(input_string, suffix):  # 兼容python3.8
        if suffix and input_string.endswith(suffix):
            return input_string[:-len(suffix)]
        return input_string

    pipeline = None
    PIPELINE_ARGS = None
    model = None

    def load_model():
        global pipeline, PIPELINE_ARGS, model
        import os
        os.environ['RWKV_JIT_ON'] = '1'
        if (os.environ.get('RWKV_CUDA_ON') == '' or os.environ.get('RWKV_CUDA_ON') == None):
            os.environ["RWKV_CUDA_ON"] = '0'
            # '1' to compile CUDA kernel (10x faster), requires c++ compiler & cuda libraries

        from rwkv.model import RWKV  # pip install rwkv
        model = RWKV(model=settings.llm.path, strategy=settings.llm.strategy)
        # if settings.rwkv_lora_path == '':
        # else:
        #     with torch.no_grad():

        from rwkv.utils import PIPELINE, PIPELINE_ARGS
        try:
            pipeline = PIPELINE(model, tokenizers_file)

        except:
            print(
                "不能使用world请更新rwkv：pip install -U rwkv -i https://mirrors.aliyun.com/pypi/simple")

        out, state = model.forward(pipeline.encode(f'''{user}{interface} hi

{answer}{interface} Hi. I am your assistant and I will provide expert full response in full details. Please feel free to ask any question and I will always answer it.

'''), None)
        states['default'] = State(state)
