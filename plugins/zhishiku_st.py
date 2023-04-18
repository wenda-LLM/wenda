from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
import sentence_transformers
import numpy as np
import re
divider=''

def get_doc_by_id(id):
    return vectorstore.docstore.search(vectorstore.index_to_docstore_id[id])

def get_doc(id,score):
    doc = get_doc_by_id(id)
    final_content=doc.page_content
    try:
        doc_before=get_doc_by_id(id-1)
        if doc_before.metadata['source']==doc.metadata['source']:
            final_content=doc_before.page_content+divider+final_content
    except:
        pass
    try:
        doc_after=get_doc_by_id(id+1)
        if doc_after.metadata['source']==doc.metadata['source']:
            final_content=final_content+divider+doc_after.page_content
    except:
        pass
    return {'title': doc.metadata['source'],'content':re.sub(r'\n+', "\n", final_content)}

def find(s):
    try:
        embedding = vectorstore.embedding_function(s)
        scores, indices = vectorstore.index.search(np.array([embedding], dtype=np.float32), 3)
        docs = []
        for j, i in enumerate(indices[0]):
            if i == -1:
                continue
            docs.append(get_doc(i,scores[0][j]))
        return docs
    except Exception as e:
        print(e)
        return []

embeddings = HuggingFaceEmbeddings(model_name='')
embeddings.client = sentence_transformers.SentenceTransformer('model/text2vec-large-chinese',
                                                                        device='cpu')
vectorstore = FAISS.load_local(
    'vectorstore_path', embeddings=embeddings)