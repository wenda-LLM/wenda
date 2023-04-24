from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
import sentence_transformers
import numpy as np
import re
from plugins.settings import settings
from plugins.settings import error_helper 
from plugins.settings import success_print 
divider='\n'

def get_doc_by_id(id):
    return vectorstore.docstore.search(vectorstore.index_to_docstore_id[id])

def process_strings(A, C, B):
    # find the longest common suffix of A and prefix of B
    common = ""
    for i in range(1, min(len(A), len(B)) + 1):
        if A[-i:] == B[:i]:
            common = A[-i:]
    # if there is a common substring, replace one of them with C and concatenate
    if common:
        return A[:-len(common)] + C + B
    # otherwise, just return A + B
    else:
        return A + B

def get_doc(id,score,step):
    doc = get_doc_by_id(id)
    final_content=doc.page_content
    print("文段分数：",score,[doc.page_content])
    if step > 0:
        for i in range(1, step+1):
            try:
                doc_before=get_doc_by_id(id-i)
                if doc_before.metadata['source']==doc.metadata['source']:
                    final_content=process_strings(doc_before.page_content,divider,final_content)
                    # print("上文分数：",score,doc.page_content)
            except:
                pass
            try:
                doc_after=get_doc_by_id(id+i)
                if doc_after.metadata['source']==doc.metadata['source']:
                    final_content=process_strings(final_content,divider,doc_after.page_content)
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
try:
    embeddings = HuggingFaceEmbeddings(model_name='')
    embeddings.client = sentence_transformers.SentenceTransformer(settings.library.st.Model_Path,
                                                                            device=settings.library.st.Device)
except Exception  as e:
    error_helper("embedding加载失败，请下载相应模型",r"https://github.com/l15y/wenda#st%E6%A8%A1%E5%BC%8F")
    raise e
try:
    vectorstore = FAISS.load_local(
        'vectorstore_path', embeddings=embeddings)
except Exception  as e:
    error_helper("vectorstore加载失败，请先构建索引",r"https://github.com/l15y/wenda#st%E6%A8%A1%E5%BC%8F")
    raise e
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
from bottle import route, response, request, static_file, hook
import bottle
@route('/api/upload_st_zhishiku', method=("POST","OPTIONS"))
def upload_zhishiku():
    try:
        data = request.json
        title=data.get("title")
        data = re.sub(r'！', "！\n", data.get("txt"))
        data = re.sub(r'：', "：\n", data)
        data = re.sub(r'。', "。\n", data)
        data = re.sub(r'[\n\r]+', "\n", data)
        docs=[Document(page_content=data, metadata={"source":title })]
        print(docs)
        
        text_splitter = CharacterTextSplitter(
            chunk_size=int(settings.library.st.Size), chunk_overlap=int(settings.library.st.Overlap), separator='\n')
        doc_texts = text_splitter.split_documents(docs)

        texts = [d.page_content for d in doc_texts]
        metadatas = [d.metadata for d in doc_texts]
        vectorstore_new = FAISS.from_texts(texts, embeddings, metadatas=metadatas)
        vectorstore.merge_from(vectorstore_new)
        return '1'
    except Exception as e:
        raise e