
import argparse
import sentence_transformers
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document
import threading
import pdfplumber
import re
import chardet
import os
import sys
import time
os.chdir(sys.path[0][:-8])

parser = argparse.ArgumentParser(description='Wenda config')
parser.add_argument('-c', type=str, dest="Config",
                    default='config.xml', help="配置文件")
parser.add_argument('-p', type=int, dest="Port", help="使用端口号")
parser.add_argument('-l', type=bool, dest="Logging", help="是否开启日志")
parser.add_argument('-t', type=str, dest="LLM_Type", help="选择使用的大模型")
args = parser.parse_args()
os.environ['wenda_'+'Config'] = args.Config
os.environ['wenda_'+'Port'] = str(args.Port)
os.environ['wenda_'+'Logging'] = str(args.Logging)
os.environ['wenda_'+'LLM_Type'] = str(args.LLM_Type)

from common import success_print
from common import error_helper
from common import settings
from common import CounterLock
source_folder = 'txt'
source_folder_path = os.path.join(os.getcwd(), source_folder)


import logging
logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.ERROR)

root_path_list = source_folder_path.split(os.sep)
docs = []
vectorstore = None

model_path = settings.library.rtst.Model_Path
try:
    embeddings = HuggingFaceEmbeddings(model_name='')
    embeddings.client = sentence_transformers.SentenceTransformer(
        model_path, device="cuda")
except Exception as e:
    error_helper("embedding加载失败，请下载相应模型",
                 r"https://github.com/l15y/wenda#st%E6%A8%A1%E5%BC%8F")
    raise e

success_print("Embedding 加载完成")

embedding_lock=CounterLock()
vectorstore_lock=threading.Lock()
def clac_embedding(texts, embeddings, metadatas):
    global vectorstore
    with embedding_lock:
        vectorstore_new = FAISS.from_texts(texts, embeddings, metadatas=metadatas)
    with vectorstore_lock:
        if vectorstore is None:
            vectorstore = vectorstore_new
        else:
            vectorstore.merge_from(vectorstore_new)

def make_index():
    global docs
    text_splitter = CharacterTextSplitter(
        chunk_size=20, chunk_overlap=0, separator='\n')
    doc_texts = text_splitter.split_documents(docs)
    docs = []
    texts = [d.page_content for d in doc_texts]
    metadatas = [d.metadata for d in doc_texts]
    thread = threading.Thread(target=clac_embedding, args=(texts, embeddings, metadatas))
    thread.start()
    while embedding_lock.get_waiting_threads()>1:
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
    if file.endswith(".pdf"):
        file_path = os.path.join(root, file)
        with pdfplumber.open(file_path) as pdf:
            data_list = []
            for page in pdf.pages:
                data_list.append(page.extract_text())
            data = "\n".join(data_list)
    else:
        # txt
        file_path = os.path.join(root, file)
        with open(file_path, 'rb') as f:
            b = f.read()
            result = chardet.detect(b)
        with open(file_path, 'r', encoding=result['encoding']) as f:
            data = f.read()
    data = re.sub(r'[\n\r]+', "", data)
    data = re.sub(r'！', "！\n", data)
    data = re.sub(r'：', "：\n", data)
    data = re.sub(r'。', "。\n", data)
    length_of_read+=len(data)
    docs.append(Document(page_content=data, metadata={"source": file}))
    if length_of_read > 1e5:
        success_print("处理进度",int(100*i/len(all_files)),f"%\t({i}/{len(all_files)})")
        make_index()
        length_of_read=0
if len(docs) > 0:
    make_index()
with embedding_lock:
    time.sleep(0.1)
    with vectorstore_lock:
        success_print("处理完成")
try:
    vectorstore_old = FAISS.load_local(
        'memory/default', embeddings=embeddings)
    success_print("合并至已有索引。如不需合并请删除 memory/default 文件夹")
    vectorstore_old.merge_from(vectorstore)
    vectorstore_old.save_local('memory/default')
except:
    print("新建索引")
    vectorstore.save_local('memory/default')
success_print("保存完成")
