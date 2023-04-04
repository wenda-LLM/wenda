import os
import sys
# sys.setrecursionlimit(3000)
from langchain.vectorstores.faiss import FAISS
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import TokenTextSplitter,CharacterTextSplitter
embeddings_path =os.environ.get('embeddings_path')
print('embeddings模型地址',embeddings_path)
vectorstore_path =os.environ.get('vectorstore_path')
print('vectorstore保存地址',vectorstore_path)
floder='txt'
files=os.listdir(floder)
def replaceall(mul,str):
    while str.find(mul) > -1:
        str = str.replace(mul,'')
    return str
for file in files:
    try:
        with open(floder+'/'+file,"r",encoding='utf-16') as f:  
            data = f.read()
    except:
            with open(floder+'/'+file,"r",encoding='utf-8') as f:  
                data = f.read()
    # data=replaceall('\n',data)
    cut_file=f"txt_out/{file}"
    with open(cut_file, 'w',encoding='utf-8') as f:   
        f.write(data)
        f.close()
print("开始读取数据")
loader = DirectoryLoader('txt_out',glob='**/*.txt')
docs = loader.load()
# text_splitter = TokenTextSplitter(chunk_size=500, chunk_overlap=15)
text_splitter = CharacterTextSplitter(chunk_size=800, chunk_overlap=20,separator='\n')
doc_texts = text_splitter.split_documents(docs)
# print(doc_texts)
from langchain.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(model_name=embeddings_path)

vectorstore = FAISS.from_documents(doc_texts, embeddings)
print("处理完成")
vectorstore.save_local(vectorstore_path)
print("保存完成")