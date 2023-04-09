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
            elif old_chat['role'] == "AI":
                tmp.append(old_chat['content'])
                history_formatted.append(tuple(tmp))
                tmp = []
            else:
                continue
    return history_formatted
def chat_one(prompt,history_formatted,max_length,top_p,temperature,zhishiku=False):
    for response, history in model.stream_chat(tokenizer, prompt, history_formatted,
     max_length=max_length, top_p=top_p,temperature=temperature):
        yield response

def load_model():
    global model,tokenizer
    from transformers import AutoModel, AutoTokenizer
    tokenizer = AutoTokenizer.from_pretrained(settings.glm_path, local_files_only=True, trust_remote_code=True)
    model = AutoModel.from_pretrained(settings.glm_path, local_files_only=True, trust_remote_code=True)
    if not (settings.glm_lora_path == '' or settings.glm_lora_path == None) :
        print('glm_lora_path模型地址',settings.glm_lora_path)
        from peft import PeftModel
        model = PeftModel.from_pretrained(model, settings.glm_lora_path)
    if bool(os.environ.get('glm_int_four')):
        print("glm int4量化中，如果已经是量化模型或不需要量化，不要开启")
        model = model.quantize(4)
    model = model.half()
    model = model.cuda()
    model = model.eval()