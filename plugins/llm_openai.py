import os
import openai


def chat_init(history):
    return history


def chat_one(prompt, history_formatted, max_length, top_p, temperature, zhishiku=False):
    history_data = [ {"role": "system", "content": "You are a helpful assistant."}]
    if history_formatted is not None:
        for i, old_chat in enumerate(history_formatted):
            if old_chat['role'] == "user":
                history_data.append(
                    {"role": "user", "content": old_chat['content']},)
            elif old_chat['role'] == "AI" or old_chat['role'] == 'assistant':
                history_data.append(
                    {"role": "assistant", "content": old_chat['content']},)
    history_data.append({"role": "user", "content": prompt},)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=history_data
    )
    yield response['choices'][0]['message']['content']


chatCompletion = None


def load_model():
    openai.api_key = os.getenv("OPENAI_API_KEY")
    openai.api_base = "https://gpt.lucent.blog/v1"
