
import argparse
import sentence_transformers
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import DirectoryLoader
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document
import pdfplumber
import re
import chardet
import os
import sys
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
from settings import settings
from settings import error_helper 
from settings import success_print 

source_folder = 'txt'
source_folder_path = os.path.join(os.getcwd(), source_folder)


root_path_list = source_folder_path.split(os.sep)
docs=[]
vectorstore=None

model_path=settings.library.rtst.Model_Path
try:
    embeddings = HuggingFaceEmbeddings(model_name='')
    embeddings.client = sentence_transformers.SentenceTransformer(
        model_path, device="cuda")
except Exception as e:
    error_helper("embedding加载失败，请下载相应模型",
                          r"https://github.com/l15y/wenda#st%E6%A8%A1%E5%BC%8F")
    raise e

def make_index():
    global vectorstore,docs
    text_splitter = CharacterTextSplitter(
        chunk_size=20, chunk_overlap=0, separator='\n')
    doc_texts = text_splitter.split_documents(docs)
    docs=[]
    texts = [d.page_content for d in doc_texts]
    metadatas = [d.metadata for d in doc_texts]
    vectorstore_new = FAISS.from_texts(texts, embeddings, metadatas=metadatas)
    if vectorstore is None:
        vectorstore=vectorstore_new
    else:
        vectorstore.merge_from(vectorstore_new)
for root, dirs, files in os.walk(source_folder_path):
    path_list = root.split(os.sep)
    for file in files:
        data=""
        title=""
        if file.endswith(".pdf"):
            file_path = os.path.join(root,file)
            with pdfplumber.open(file_path) as pdf:
                data_list = []
                for page in pdf.pages:
                    data_list.append(page.extract_text())
                data = "\n".join(data_list)
            title = file.replace(".pdf","")
        else:
            # 其他支持，这里是txt
            try:
                file_path = os.path.join(root, file)
                with open('test1.txt', 'rb') as f:
                    b=f.read()
                    result = chardet.detect(b)
                    data = b.decode(encoding=result['encoding'])
            except:
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding='utf-8') as f:
                    data = f.read()
            title = file.replace(".txt","")
        data = re.sub(r'[\n\r]+', "", data)
        data = re.sub(r'！', "！\n", data)
        data = re.sub(r'：', "：\n", data)
        data = re.sub(r'。', "。\n", data)
        print("读取",len(data),title)
        docs.append(Document(page_content=data, metadata={"source":title }))
        if len(docs)>100:
            make_index()
if len(docs)>0:
    make_index()
try:
    vectorstore_old = FAISS.load_local(
        'memory/default', embeddings=embeddings)
    print("9.合并至已有索引。如不需合并请删除 memory/default 文件夹 9/10")
    vectorstore_old.merge_from(vectorstore)
    vectorstore_old.save_local('memory/default')
except:
    print("9.新建索引 9/10")
    vectorstore.save_local('memory/default')
success_print("10.保存完成 10/10")
