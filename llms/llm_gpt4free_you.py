import llms.gpt4free.you as openai_api


def chat_init(history):
    # history_data  = [
    #     {
    #         'is_sent': True,
    #         'message': 'my name is Tekky'
    #     },
    #     {
    #         'is_sent': False,
    #         'message': 'hello Tekky'
    #     }
    # ]
    history_data = []
    if history is not None:
        history_data = []
        question=""
        for i, old_chat in enumerate(history):
            if  old_chat['role'] == "user":
                        question=old_chat['content']
            elif old_chat['role'] == "AI" or old_chat['role'] == 'assistant':
                history_data.append({"question": question, "answer": old_chat['content']})
    return history_data


def chat_one(prompt, history_formatted, max_length, top_p, temperature, data):
    response = openai_api.Completion.create(
        prompt  = prompt,
        chat    = history_formatted)
    
    yield response["response"]




def load_model():
    pass