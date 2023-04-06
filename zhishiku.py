
import settings
import threading
mutex = threading.Lock()
from langchain.llms.base import LLM
from typing import Optional, List
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores.faiss import FAISS
from langchain.prompts.prompt import PromptTemplate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import ChatVectorDBChain
class ChatGLM_G(LLM):
    @property
    def _llm_type(self) -> str:
        return "ChatGLM_G"
    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        return prompt


embeddings=None
qa=None
vectorstore=None
def load_model():
    global embeddings,qa,vectorstore
    embeddings = HuggingFaceEmbeddings(model_name=settings.embeddings_path)
    vectorstore = FAISS.load_local(settings.vectorstore_path, embeddings=embeddings)
    qa=init_agent()
    print("知识库加载完成")
thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()
def find(s):
    return [document_to_dict(d) for d in vectorstore.similarity_search(s)]

def document_to_dict(d):
    return {'c':d.page_content,'s':d.metadata['source']}

def init_agent():
    system_template = """使用以下文段, 用中文回答用户问题。如果无法从中得到答案，请说"没有足够的相关信息"。
{context}
"""
    messages = [
        SystemMessagePromptTemplate.from_template(system_template),
        HumanMessagePromptTemplate.from_template("{question}"),
    ]
    prompt = ChatPromptTemplate.from_messages(messages)
    condese_propmt_template = """任务: 给一段对话和一个后续问题，将后续问题改写成一个独立的问题。(确保问题是完整的, 没有模糊的指代)
聊天记录：
{chat_history}
###
后续问题：{question}
改写后的独立, 完整的问题："""
    new_question_prompt = PromptTemplate.from_template(condese_propmt_template)
    # print(new_question_prompt)
    qa = ChatVectorDBChain.from_llm(
        llm=ChatGLM_G(),
        vectorstore=vectorstore,
        qa_prompt=prompt,
        condense_question_prompt=new_question_prompt,
    )
    qa.return_source_documents = True
    qa.top_k_docs_for_context = settings.chunk_count
    return qa
