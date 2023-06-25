import re
import os
import sys
import math
import threading
import loguru
from hashlib import md5

os.chdir(sys.path[0][:-8])
from langchain.text_splitter import CharacterTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
from langchain.docstore.document import Document
from typing import Dict, Iterable, List, Optional, Union
from langchain.embeddings import HuggingFaceEmbeddings

import logging, time
logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.ERROR)
import chardet
import pdfplumber
from qdrant import Qdrant
from common import CounterLock
from common import settings, error_print, error_helper, success_print


source_folder = settings.librarys.qdrant.path
source_folder_path = os.path.join(os.getcwd(), source_folder)
root_path_list = source_folder_path.split(os.sep)
docs = []
texts_count = 0

MetadataFilter = Dict[str, Union[str, int, bool]]
COLLECTION_NAME = settings.librarys.qdrant.collection  # 向量库名字
model_path = settings.librarys.qdrant.model_path

try:
    encode_kwargs = {'batch_size': settings.librarys.qdrant.batch_size}
    model_kwargs = {"device": settings.librarys.qdrant.device}
    embedding = HuggingFaceEmbeddings(model_name=model_path, encode_kwargs=encode_kwargs, model_kwargs=model_kwargs)
except Exception as e:
    error_helper("embedding加载失败，请下载相应模型",
                 r"https://github.com/l15y/wenda#st%E6%A8%A1%E5%BC%8F")
    raise e

success_print("Embedding model加载完成")

try:
    client = QdrantClient(path="memory/q")
    client.get_collection(COLLECTION_NAME)
    vectorstore = Qdrant(client, COLLECTION_NAME, embedding)
except:
    del client
    vectorstore = None
# vectorstore = None

embedding_lock = CounterLock()
vectorstore_lock = threading.Lock()


def clac_embedding(texts, embedding, metadatas):
    global vectorstore
    with embedding_lock:
        embeddings = embedding.embed_documents(texts)
    with vectorstore_lock:
        ids = gen_ids(metadatas)
        if vectorstore is None:
            # 如需插入大规模数据可以将prefer_grpc参数置为True
            if(settings.librarys.qdrant.qdrant_path):
                vectorstore = Qdrant.from_texts(texts, embedding, embeddings, ids, metadatas=metadatas,
                                            path=settings.librarys.qdrant.qdrant_path, prefer_grpc=True,
                                            collection_name=settings.librarys.qdrant.collection, timeout=10)
            elif(settings.librarys.qdrant.qdrant_host):
                vectorstore = Qdrant.from_texts(texts, embedding, embeddings, ids, metadatas=metadatas,
                                            url=settings.librarys.qdrant.qdrant_host, prefer_grpc=True,
                                            collection_name=settings.librarys.qdrant.collection, timeout=10)
        else:
            vectorstore.add_texts(texts, embeddings, ids, metadatas)


# 生成该id的方法仅供参考
def gen_ids(metadatas):
    ids = []
    same_title_count = 0
    last_text_title = ""
    for metadata in metadatas:
        text_title = md5(metadata["source"].encode("utf-8")).hexdigest()
        if last_text_title != text_title:
            last_text_title = text_title
            same_title_count = 0
        else:
            same_title_count += 1
        origin = text_title[:30] + str(hex(same_title_count))[2:].zfill(3)  # 最后三位为十六进制的文章段落数 前二十九位为文章title哈希
        origin = f"{origin[:8]}-{origin[8:12]}-{origin[12:16]}-{origin[16:20]}-{origin[-12:]}"
        ids.append(origin)

    return ids


def make_index():
    global docs, texts_count
    if hasattr(settings.librarys.qdrant, "size") and hasattr(settings.librarys.qdrant, "overlap"):
        text_splitter = CharacterTextSplitter(
            chunk_size=int(settings.librarys.qdrant.size), chunk_overlap=int(settings.librarys.qdrant.overlap), separator='\n')
    else:
        text_splitter = CharacterTextSplitter(
            chunk_size=20, chunk_overlap=0, separator='\n')
    doc_texts = text_splitter.split_documents(docs)
    docs = []
    texts = [d.page_content for d in doc_texts]
    metadatas = [d.metadata for d in doc_texts]
    texts_count += len(texts)
    thread = threading.Thread(target=clac_embedding, args=(texts, embedding, metadatas))
    thread.start()
    while embedding_lock.get_waiting_threads() > 1:
        time.sleep(0.1)


all_files = []

for root, dirs, files in os.walk(source_folder_path):
    for file in files:
        all_files.append([root, file])
success_print("文件列表生成完成", len(all_files))
length_of_read = 0
for i in range(len(all_files)):
    root, file = all_files[i]
    data = ""
    title = ""
    try:
        file_path = os.path.join(root, file)
        _, ext = os.path.splitext(file_path)
        if ext.lower() == '.pdf':
            # pdf
            with pdfplumber.open(file_path) as pdf:
                data_list = []
                for page in pdf.pages:
                    print(page.extract_text())
                    data_list.append(page.extract_text())
                data = "\n".join(data_list)
        elif ext.lower() == '.txt':
            # txt
            with open(file_path, 'rb') as f:
                print("open:",file_path)
                b = f.read()
                result = chardet.detect(b)
            with open(file_path, 'r', encoding=result['encoding']) as f:
                data = f.read()
        else:
            print("目前还不支持文件格式：", ext)
    except Exception as e:
        print("文件读取失败，当前文件已被跳过：", file, "。错误信息：", e)
    data = re.sub(r'！', "！\n", data)
    data = re.sub(r'：', "：\n", data)
    data = re.sub(r'。', "。\n", data)
    data = re.sub(r'\r', "\n", data)
    data = re.sub(r'\n\n', "\n", data)
    data = re.sub(r"\n\s*\n", "\n", data)
    length_of_read += len(data)
    docs.append(Document(page_content=data, metadata={"source": file}))
    if length_of_read > 1e5:  # 大于10万字的先处理（即不作为最后的统一处理）
        success_print("处理进度", int(100*i/len(all_files)), f"%\t({i}/{len(all_files)})")
        make_index()
        length_of_read = 0
    length_of_read += len(data)
    docs.append(Document(page_content=data, metadata={"source": file}))
    if length_of_read > 1e5:
        success_print("处理进度", int(100 * i / len(all_files)), f"%\t({i}/{len(all_files)})")
        make_index()
        length_of_read = 0


if len(all_files) == 0:
    error_print("指定目录{}没有数据".format(settings.librarys.qdrant.path))
    sys.exit(0)

if len(docs) > 0:
    make_index()

while embedding_lock.get_waiting_threads() > 0:
    time.sleep(0.1)
with embedding_lock:
    time.sleep(0.1)
    success_print("数据上装完成")
    with vectorstore_lock:
        print("开始构建索引，需要一定时间")
        vectorstore.client.update_collection(
            collection_name=COLLECTION_NAME,
            optimizer_config=rest.OptimizersConfigDiff(
                indexing_threshold=20000
            )
        )
        success_print("索引处理完成")
