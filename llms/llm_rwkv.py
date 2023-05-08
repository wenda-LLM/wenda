from plugins.common import settings
import re

if settings.llm.strategy.startswith("Q"):
    runtime = "cpp"

    from typing import Optional
    import torch
    import tokenizers
    from llms.rwkvcpp.sampling import sample_logits
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
        
        from llms.rwkvcpp.rwkv_cpp_shared_library import load_rwkv_shared_library
        library = load_rwkv_shared_library()
        print(f'System info: {library.rwkv_get_system_info_string()}')
        print('Loading RWKV model')
        from llms.rwkvcpp.rwkv_cpp_model import RWKVModel
        try:
            cpu_count = int(settings.llm.strategy.split('->')[1])
            model = RWKVModel(library, settings.llm.path,cpu_count)
        except:
            model = RWKVModel(library, settings.llm.path)
        print('Loading 20B tokenizer')
        tokenizer = tokenizers.Tokenizer.from_file(str('20B_tokenizer.json'))


else:
    runtime = "torch"

    def chat_init(history):
        global state
        if settings.llm.historymode!='string':
            if history is not None and len(history) > 0:
                pass
            else:
                state = None
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
        # print(ctx)
        yield str(len(ctx))+'字正在计算'
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
                # print(tmp, end='')
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
        model = RWKV(model=settings.llm.path, strategy=settings.llm.strategy)
        # if settings.rwkv_lora_path == '':
        # else:
        #     with torch.no_grad():

        from rwkv.utils import PIPELINE, PIPELINE_ARGS
        pipeline = PIPELINE(model, "20B_tokenizer.json")
