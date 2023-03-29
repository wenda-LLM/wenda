import os
import sys
# sys.setrecursionlimit(3000)
from langchain.vectorstores.faiss import FAISS
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import TokenTextSplitter,CharacterTextSplitter
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
loader = DirectoryLoader('txt_out',glob='**/*.txt')
docs = loader.load()
# text_splitter = TokenTextSplitter(chunk_size=500, chunk_overlap=15)
text_splitter = CharacterTextSplitter(chunk_size=800, chunk_overlap=20,separator='\n')
doc_texts = text_splitter.split_documents(docs)
# print(doc_texts)
model_name = "sentence-transformers/simcse-chinese-roberta-wwm-ext"
# model_name = "ACGVoc2vec"
from langchain.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(model_name=model_name)

vectorstore = FAISS.from_documents(doc_texts, embeddings)
vectorstore.save_local('xw')
print(1)