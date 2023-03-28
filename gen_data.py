

import os
import streamlit as st
import pandas as pd
import os
from langchain.vectorstores.faiss import FAISS
from langchain.document_loaders import DirectoryLoader

from langchain.text_splitter import TokenTextSplitter
import jieba as jb
files=os.listdir('txt')
for file in files:
    with open('txt/'+file,"r",encoding='utf-8') as f:  
        data = f.read()
    cut_data = " ".join([w for w in list(jb.cut(data))])
    cut_file=f"txt_out/{file}"
    with open(cut_file, 'w',encoding='utf-8') as f:   
        f.write(cut_data)
        f.close()
loader = DirectoryLoader('txt_out',glob='**/*.txt')
docs = loader.load()
text_splitter = TokenTextSplitter(chunk_size=300, chunk_overlap=0)
doc_texts = text_splitter.split_documents(docs)

from langchain.embeddings import HuggingFaceInstructEmbeddings
model_name = "hkunlp/instructor-large"
embeddings = HuggingFaceInstructEmbeddings(model_name=model_name)

vectorstore = FAISS.from_documents(doc_texts, embeddings)
vectorstore.save_local('fy')