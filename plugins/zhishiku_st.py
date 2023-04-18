from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
import sentence_transformers
import numpy as np
import re
from plugins.settings import settings
divider=''

def get_doc_by_id(id):
    return vectorstore.docstore.search(vectorstore.index_to_docstore_id[id])

def get_doc(id,score,step):
    doc = get_doc_by_id(id)
    final_content=doc.page_content
    if step > 0:
        for i in range(1, step+1):
            try:
                doc_before=get_doc_by_id(id-i)
                if doc_before.metadata['source']==doc.metadata['source']:
                    final_content=doc_before.page_content+divider+final_content
            except:
                pass
            try:
                doc_after=get_doc_by_id(id+i)
                if doc_after.metadata['source']==doc.metadata['source']:
                    final_content=final_content+divider+doc_after.page_content
            except:
                pass
    return {'title': doc.metadata['source'],'content':re.sub(r'\n+', "\n", final_content)}

def find(s,step = 0):
    try:
        embedding = vectorstore.embedding_function(s)
        scores, indices = vectorstore.index.search(np.array([embedding], dtype=np.float32), int(settings.library.st.Count))
        docs = []
        for j, i in enumerate(indices[0]):
            if i == -1:
                continue
            docs.append(get_doc(i,scores[0][j],step))
        return docs
    except Exception as e:
        print(e)
        return []

embeddings = HuggingFaceEmbeddings(model_name='')
embeddings.client = sentence_transformers.SentenceTransformer(settings.library.st.Model_Path,
                                                                        device=settings.library.st.Device)
vectorstore = FAISS.load_local(
    'vectorstore_path', embeddings=embeddings)