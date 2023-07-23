
import argparse
import sentence_transformers
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
import threading
import pdfplumber
import re
import chardet
import os
import sys
import time
sys.path.append(os.getcwd())
from plugins.common import success_print, error_print
from plugins.common import error_helper
from plugins.common import settings
from plugins.common import CounterLock

if settings.librarys.rtst.backend=="Annoy":
    from langchain.vectorstores.annoy import Annoy as Vectorstore
else:
    from langchain.vectorstores.faiss import FAISS as Vectorstore
source_folder = 'txt'
source_folder_path = os.path.join(os.getcwd(), source_folder)


import logging
logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.ERROR)

root_path_list = source_folder_path.split(os.sep)
docs = []
vectorstore = None

model_path = settings.librarys.rtst.model_path
try:
    if model_path.startswith("http"):#"http://127.0.0.1:3000/"
        from langchain.embeddings import OpenAIEmbeddings
        import os
        os.environ["OPENAI_API_TYPE"] = "open_ai"
        os.environ["OPENAI_API_BASE"] = model_path
        os.environ["OPENAI_API_KEY"] = "your OpenAI key"

        from langchain.embeddings.openai import OpenAIEmbeddings
        embeddings = OpenAIEmbeddings(
            deployment="text-embedding-ada-002",
            model="text-embedding-ada-002"
        )
    else:
        from langchain.embeddings import HuggingFaceEmbeddings
        embeddings = HuggingFaceEmbeddings(model_name='')
        embeddings.client = sentence_transformers.SentenceTransformer(
            model_path, device="cuda")
except Exception as e:
    error_helper("embedding加载失败",
                 r"https://github.com/l15y/wenda")
    raise e

success_print("Embedding 加载完成")

embedding_lock=CounterLock()
vectorstore_lock=threading.Lock()
def clac_embedding(texts, embeddings, metadatas):
    global vectorstore
    with embedding_lock:
        vectorstore_new = Vectorstore.from_texts(texts, embeddings, metadatas=metadatas)
    with vectorstore_lock:
        if vectorstore is None:
            vectorstore = vectorstore_new
        else:
            vectorstore.merge_from(vectorstore_new)

def make_index():
    global docs
    if hasattr(settings.librarys.rtst,"size") and hasattr(settings.librarys.rtst,"overlap"):
        text_splitter = CharacterTextSplitter(
            chunk_size=int(settings.librarys.rtst.size), chunk_overlap=int(settings.librarys.rtst.overlap), separator='\n')
    else:
        text_splitter = CharacterTextSplitter(
            chunk_size=20, chunk_overlap=0, separator='\n')
    doc_texts = text_splitter.split_documents(docs)
    docs = []
    texts = [d.page_content for d in doc_texts]
    metadatas = [d.metadata for d in doc_texts]
    thread = threading.Thread(target=clac_embedding, args=(texts, embeddings, metadatas))
    thread.start()
    while embedding_lock.get_waiting_threads()>2:
        time.sleep(0.1)

all_files=[]

for root, dirs, files in os.walk(source_folder_path):
    for file in files:
        all_files.append([root, file])
success_print("文件列表生成完成",len(all_files))
length_of_read=0
for i in range(len(all_files)):
    root, file=all_files[i]
    data = ""
    title = ""
    try:
        file_path = os.path.join(root, file)
        _, ext = os.path.splitext(file_path)
        if ext.lower() == '.pdf':
            #pdf
            with pdfplumber.open(file_path) as pdf:
                data_list = []
                for page in pdf.pages:
                    print(page.extract_text())
                    data_list.append(page.extract_text())
                data = "\n".join(data_list)
        elif ext.lower() == '.txt':
            # txt
            with open(file_path, 'rb') as f:
                b = f.read()
                result = chardet.detect(b)
            with open(file_path, 'r', encoding=result['encoding']) as f:
                data = f.read()
        else:
            print("目前还不支持文件格式：", ext)
    except Exception as e:
        print("文件读取失败，当前文件已被跳过：",file,"。错误信息：",e)
    # data = re.sub(r'！', "！\n", data)
    # data = re.sub(r'：', "：\n", data)
    # data = re.sub(r'。', "。\n", data)
    data = re.sub(r"\n\s*\n", "\n", data)
    data = re.sub(r'\r', "\n", data)
    data = re.sub(r'\n\n', "\n", data)
    length_of_read+=len(data)
    docs.append(Document(page_content=data, metadata={"source": file}))
    if length_of_read > 1e5:
        success_print("处理进度",int(100*i/len(all_files)),f"%\t({i}/{len(all_files)})")
        make_index()
        # print(embedding_lock.get_waiting_threads())
        length_of_read=0


if len(all_files) == 0:
    error_print("txt 目录没有数据")
    sys.exit(0)

if len(docs) > 0:
    make_index()

while embedding_lock.get_waiting_threads()>0:
    time.sleep(0.1)
success_print("处理进度",100,"%")
with embedding_lock:
    time.sleep(0.1)
    with vectorstore_lock:
        success_print("处理完成")
try:
    vectorstore_old = Vectorstore.load_local(
        'memory/default', embeddings=embeddings)
    success_print("合并至已有索引。如不需合并请删除 memory/default 文件夹")
    vectorstore_old.merge_from(vectorstore)
    vectorstore_old.save_local('memory/default')
except:
    print("新建索引")
    vectorstore.save_local('memory/default')
success_print("保存完成")
