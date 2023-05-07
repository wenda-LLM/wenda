from plugins.common import settings

def chat_init(history):
    history_formatted = None
    if history is not None:
        history_formatted = ""
        for i, old_chat in enumerate(history):
            if old_chat['role'] == "user":
                history_formatted+="Q: "+old_chat['content']+'\n'
            elif old_chat['role'] == "AI" or old_chat['role'] == 'assistant':
                history_formatted+=" A: "+old_chat['content']+'\n'
            else:
                continue
    return history_formatted+" "


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    if zhishiku:
        prompt=history_formatted+"%s\nAssistant: "%prompt
    else:
        prompt=history_formatted+"Human: %s\nAssistant: "%prompt
    stream = model(prompt,
    stop=["Human:","### Hum",], temperature=temperature,max_tokens=max_length, top_p=top_p,stream=True)
    # print(output['choices'])
    text=""
    for output in stream:
        text+=output["choices"][0]["text"]
        yield text

def load_model():
    global model
    from llama_cpp import Llama
    model = Llama(model_path=settings.llm.path,use_mlock=True,n_ctx=4096)

