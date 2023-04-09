
import settings
import os
from langchain.vectorstores.faiss import FAISS
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import TokenTextSplitter,CharacterTextSplitter
floder='txt'
files=os.listdir(floder)
def replaceall(mul,str):
    while str.find(mul) > -1:
        str = str.replace(mul,'')
    return str
def replace_all_double_n(str):
    while str.find('\n\n') > -1:
        str = str.replace('\n\n','\n')
    return str
if not os.path.exists('txt_out'):
    os.mkdir('txt_out')
for file in files:
    try:
        with open(floder+'/'+file,"r",encoding='utf-16') as f:  
            data = f.read()
    except:
            with open(floder+'/'+file,"r",encoding='utf-8') as f:  
                data = f.read()
    data=replace_all_double_n(data)
    cut_file=f"txt_out/{file}"
    with open(cut_file, 'w',encoding='utf-8') as f:   
        f.write(data)
        f.close()
print("开始读取数据")
loader = DirectoryLoader('txt_out',glob='**/*.txt')
docs = loader.load()
# text_splitter = TokenTextSplitter(chunk_size=500, chunk_overlap=15)
text_splitter = CharacterTextSplitter(chunk_size=settings.chunk_size, chunk_overlap=20,separator='\n')
doc_texts = text_splitter.split_documents(docs)
# print(doc_texts)
from langchain.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(model_name=settings.embeddings_path)

vectorstore = FAISS.from_documents(doc_texts, embeddings)
print("处理完成")
vectorstore.save_local(settings.vectorstore_path)
print("保存完成")