from plugins import settings
import os


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
    stream = model("Q: %s A: "%prompt, stop=["Q:", "\n"],stream=True)
    # print(output['choices'])
    response=""
    for output in stream:
        response+=output["choices"][0]["text"]
        yield response


def load_model():
    global model
    from llama_cpp import Llama
    model = Llama(model_path=settings.llama_path)

