from plugins import settings
import os


def chat_init(history):
    history_formatted = None
    if history is not None:
        history_formatted = ""
        for i, old_chat in enumerate(history):
            if len(tmp) == 0 and old_chat['role'] == "user":
                history_formatted+="Q: "+old_chat['content']
            elif old_chat['role'] == "AI" or old_chat['role'] == 'assistant':
                history_formatted+=" A: "+old_chat['content']
            else:
                continue
    return history_formatted+" "


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    stream = model(history_formatted+"Q: %s A: "%prompt, stop=["Q:", "\n"], max_tokens=max_length, temperature=temperature, top_p=top_p,stream=True)
    # print(output['choices'])
    text=""
    for output in stream:
        text+=output["choices"][0]["text"]
        yield text

def load_model():
    global model
    from llama_cpp import Llama
    model = Llama(model_path=settings.llama_path,use_mlock=True)

