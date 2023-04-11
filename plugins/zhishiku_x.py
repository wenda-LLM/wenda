from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from typing import Optional, List
from langchain.llms.base import LLM
from plugins import settings
import threading
mutex = threading.Lock()


class Fake_LLM(LLM):
    @property
    def _llm_type(self) -> str:
        return "Fake_LLM"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        return prompt


def replace_all_double_n(str):
    while str.find('\n\n') > -1:
        str = str.replace('\n\n', '\n')
    return str


def find(s):
    result = vectorstore.similarity_search(s, settings.chunk_count)
    print(result)
    return [document_to_dict(r) for r in result]


def document_to_dict(d):
    return {'title': d.metadata['source'], 'content': replace_all_double_n(d.page_content)}


embeddings = None
qa = None
vectorstore = None


def load_model():
    global embeddings, qa, vectorstore
    embeddings = HuggingFaceEmbeddings(model_name=settings.embeddings_path)
    vectorstore = FAISS.load_local(
        settings.vectorstore_path, embeddings=embeddings)
    print("知识库加载完成")


thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()
