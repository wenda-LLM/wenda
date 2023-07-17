import os
from typing import List,  Any
from enum import auto, Enum
import dataclasses
from flagai.data.tokenizer import Tokenizer
from flagai.model.predictor.aquila import aquila_generate
from flagai.model.predictor.predictor import Predictor
from flagai.auto_model.auto_loader import AutoLoader
from plugins.common import settings
import torch


def chat_init(history):
    history_formatted = None
    history_formatted = default_conversation.copy()
    if history is not None:
        tmp = []
        for i, old_chat in enumerate(history):
            if len(tmp) == 0 and old_chat['role'] == "user":
                    history_formatted.append_message(history_formatted.roles[0], old_chat['content'])
            elif old_chat['role'] == "AI" or old_chat['role'] == 'assistant':
                    history_formatted.append_message(history_formatted.roles[0], old_chat['content'])
            else:
                continue
    return history_formatted


def chat_one(prompt, history_formatted, max_length, top_p, temperature, data):
    history_formatted.append_message(history_formatted.roles[0], prompt)
    history_formatted.append_message(history_formatted.roles[1], None)
    prompt=history_formatted.get_prompt()

    tokens = tokenizer.encode_plus(
        f"{prompt}", None, max_length=None)['input_ids']
    tokens = tokens[1:-1]
    yield str(len(prompt))+'字正在计算\n'+str(len(tokens))+"tokens"

    with torch.no_grad():
        out = aquila_generate(tokenizer, model, [
                              prompt], max_gen_len= max_length, top_p=top_p, prompts_tokens=[tokens])
        yield(out)


def load_model():
    global model, tokenizer
    state_dict, model_name = os.path.split(settings.llm.path)

    loader = AutoLoader(
        "lm",
        model_dir=state_dict,
        model_name=model_name,
        use_cache=True)

    model = loader.get_model()
    tokenizer = loader.get_tokenizer()
    model.eval()
    model.half()
    model.cuda()


text = "北京为什么是中国的首都？"


def pack_obj(text):
    obj = dict()
    obj['id'] = 'demo'

    obj['conversations'] = []
    human = dict()
    human['from'] = 'human'
    human['value'] = text
    obj['conversations'].append(human)
    # dummy bot
    bot = dict()
    bot['from'] = 'gpt'
    bot['value'] = ''
    obj['conversations'].append(bot)

    obj['instruction'] = ''

    return obj


def delete_last_bot_end_singal(convo_obj):
    conversations = convo_obj['conversations']
    assert len(conversations) > 0 and len(conversations) % 2 == 0
    assert conversations[0]['from'] == 'human'

    last_bot = conversations[len(conversations)-1]
    assert last_bot['from'] == 'gpt'

    # from _add_speaker_and_signal
    END_SIGNAL = "\n"
    len_end_singal = len(END_SIGNAL)
    len_last_bot_value = len(last_bot['value'])
    last_bot['value'] = last_bot['value'][:len_last_bot_value-len_end_singal]
    return


def convo_tokenize(convo_obj, tokenizer):
    chat_desc = convo_obj['chat_desc']
    instruction = convo_obj['instruction']
    conversations = convo_obj['conversations']

    # chat_desc
    example = tokenizer.encode_plus(
        f"{chat_desc}", None, max_length=None)['input_ids']
    EOS_TOKEN = example[-1]
    example = example[:-1]  # remove eos
    # instruction
    instruction = tokenizer.encode_plus(
        f"{instruction}", None, max_length=None)['input_ids']
    instruction = instruction[1:-1]  # remove bos & eos
    example += instruction

    for conversation in conversations:
        role = conversation['from']
        content = conversation['value']
        print(f"role {role}, raw content {content}")
        content = tokenizer.encode_plus(
            f"{content}", None, max_length=None)['input_ids']
        content = content[1:-1]  # remove bos & eos
        print(f"role {role}, content {content}")
        example += content
    return example


class SeparatorStyle(Enum):
    """Different separator style."""
    SINGLE = auto()
    TWO = auto()


@dataclasses.dataclass
class Conversation:
    """A class that keeps all conversation history."""
    system: str
    instruction: str
    roles: List[str]
    messages: List[List[str]]
    offset: int
    sep_style: SeparatorStyle = SeparatorStyle.SINGLE
    sep: str = "###"
    sep2: str = None

    skip_next: bool = False
    conv_id: Any = None

    def get_prompt(self):
        if self.sep_style == SeparatorStyle.SINGLE:
            ret = self.system + self.sep
            if self.instruction is not None and len(self.instruction) > 0:
                ret += self.roles[2] + ": " + self.instruction + self.sep
            for role, message in self.messages:
                if message:
                    ret += role + ": " + message + self.sep
                else:
                    ret += role + ":"
            return ret
        elif self.sep_style == SeparatorStyle.TWO:
            seps = [self.sep, self.sep2]
            ret = self.system + seps[0]
            if self.instruction is not None and len(self.instruction) > 0:
                ret += self.roles[2] + ": " + self.instruction + self.sep
            for i, (role, message) in enumerate(self.messages):
                if message:
                    ret += role + ": " + message + seps[i % 2]
                else:
                    ret += role + ":"
            return ret
        else:
            raise ValueError(f"Invalid style: {self.sep_style}")

    def append_message(self, role, message):
        self.messages.append([role, message])

    def to_gradio_chatbot(self):
        ret = []
        for i, (role, msg) in enumerate(self.messages[self.offset:]):
            if i % 2 == 0:
                ret.append([msg, None])
            else:
                ret[-1][-1] = msg
        return ret

    def copy(self):
        return Conversation(
            system=self.system,
            instruction=self.instruction,
            roles=self.roles,
            messages=[[x, y] for x, y in self.messages],
            offset=self.offset,
            sep_style=self.sep_style,
            sep=self.sep,
            sep2=self.sep2,
            conv_id=self.conv_id)

    def dict(self):
        return {
            "system": self.system,
            "instruction": self.instruction,
            "roles": self.roles,
            "messages": self.messages,
            "offset": self.offset,
            "sep": self.sep,
            "sep2": self.sep2,
            "conv_id": self.conv_id,
        }


conv_v1 = Conversation(
    system="A chat between a curious human and an artificial intelligence assistant. "
           "The assistant gives helpful, detailed, and polite answers to the human's questions.",
    instruction="",
    roles=("Human", "Assistant", "System"),
    messages=(),
    offset=0,
    sep_style=SeparatorStyle.SINGLE,
    sep="###",
)

conv_v1_2 = Conversation(
    system="A chat between a curious human and an artificial intelligence assistant. "
           "The assistant gives helpful, detailed, and polite answers to the human's questions.",
    instruction="",
    roles=("Human", "Assistant", "System"),
    messages=(),
    offset=0,
    sep_style=SeparatorStyle.SINGLE,
    sep="###",
)

conv_bair_v1 = Conversation(
    system="BEGINNING OF CONVERSATION:",
    instruction="",
    roles=("USER", "GPT", "System"),
    messages=(),
    offset=0,
    sep_style=SeparatorStyle.TWO,
    sep=" ",
    sep2="</s>",
)


default_conversation = conv_v1_2
