from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
import sentence_transformers
import numpy as np
import re,os
from plugins.common import settings,allowCROS
from plugins.common import error_helper 
from plugins.common import success_print 
divider='\n'

if not os.path.exists('memory'):
    os.mkdir('memory')
cunnrent_setting=settings.librarys.rtst
def get_doc_by_id(id,memory_name):
    return vectorstores[memory_name].docstore.search(vectorstores[memory_name].index_to_docstore_id[id])

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
    
def get_title_by_doc(doc):
    return re.sub('【.+】', '', doc.metadata['source'])
def get_doc(id,score,step,memory_name):
    doc = get_doc_by_id(id,memory_name)
    final_content=doc.page_content
    print("文段分数：",score,[doc.page_content])
    if step > 0:
        for i in range(1, step+1):
            try:
                doc_before=get_doc_by_id(id-i,memory_name)
                if get_title_by_doc(doc_before)==get_title_by_doc(doc):
                    final_content=process_strings(doc_before.page_content,divider,final_content)
                    # print("上文分数：",score,doc.page_content)
            except:
                pass
            try:
                doc_after=get_doc_by_id(id+i,memory_name)
                if get_title_by_doc(doc_after)==get_title_by_doc(doc):
                    final_content=process_strings(final_content,divider,doc_after.page_content)
            except:
                pass
    if doc.metadata['source'].endswith(".pdf") or doc.metadata['source'].endswith(".txt"):
        title=f"[{doc.metadata['source']}](/api/read_news/{doc.metadata['source']})"
    else:
        title=doc.metadata['source']
    return {'title': title,'content':re.sub(r'\n+', "\n", final_content),"score":int(score)}
def find(s,step = 0,memory_name="default"):
    try:
        embedding = get_vectorstore(memory_name).embedding_function(s)
        scores, indices = vectorstores[memory_name].index.search(np.array([embedding], dtype=np.float32), int(cunnrent_setting.count))
        docs = []
        for j, i in enumerate(indices[0]):
            if i == -1:
                continue
            if scores[0][j]>700:continue
            docs.append(get_doc(i,scores[0][j],step,memory_name))

        return docs
    except Exception as e:
        print(e)
        return []
try:
    embeddings = HuggingFaceEmbeddings(model_name='')
    embeddings.client = sentence_transformers.SentenceTransformer(cunnrent_setting.model_path,
                                                                            device=cunnrent_setting.device)
except Exception  as e:
    error_helper("embedding加载失败，请下载语义知识库计算模型",r"https://github.com/l15y/wenda#st%E6%A8%A1%E5%BC%8F")
    raise e
vectorstores={}
def get_vectorstore(memory_name):
    try:
        return vectorstores[memory_name]
    except Exception  as e:
        try:
            vectorstores[memory_name] = FAISS.load_local(
                'memory/'+memory_name, embeddings=embeddings)
            return vectorstores[memory_name]
        except Exception  as e:
            success_print("没有读取到RTST记忆区%s，将新建。"%memory_name)
    return None

from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
from bottle import route, response, request, static_file, hook
import bottle
@route('/api/upload_rtst_zhishiku', method=("POST","OPTIONS"))
def upload_zhishiku():
    allowCROS()
    try:
        data = request.json
        title=data.get("title")
        memory_name=data.get("memory_name")
        data = re.sub(r'！', "！\n", data.get("txt"))
        data = re.sub(r'。', "。\n", data)
        data = re.sub(r'[\n\r]+', "\n", data)
        docs=[Document(page_content=data, metadata={"source":title })]
        print(docs)
        
        text_splitter = CharacterTextSplitter(
            chunk_size=20, chunk_overlap=0, separator='\n')
        doc_texts = text_splitter.split_documents(docs)

        texts = [d.page_content for d in doc_texts]
        metadatas = [d.metadata for d in doc_texts]
        vectorstore_new = FAISS.from_texts(texts, embeddings, metadatas=metadatas)
        vectorstore=get_vectorstore(memory_name)
        if vectorstore is None:
            vectorstores[memory_name]=vectorstore_new
        else:
            vectorstores[memory_name].merge_from(vectorstore_new)
        return '成功'
    except Exception as e:
        return str(e)
@route('/api/save_rtst_zhishiku', method=("POST","OPTIONS"))
def save_zhishiku():
    allowCROS()
    try:
        data = request.json
        memory_name=data.get("memory_name")
        vectorstores[memory_name].save_local('memory/'+memory_name)
        return "保存成功"
    except Exception as e:
        return str(e)
import json
@route('/api/find_rtst_in_memory', method=("POST","OPTIONS"))
def api_find():
    allowCROS()
    try:
        data = request.json
        prompt = data.get('prompt')
        step = data.get('step')
        memory_name=data.get("memory_name")
        if step is None:
            step = int(settings.library.step)
        return json.dumps(find(prompt,int(step),memory_name))
    except Exception as e:
        return str(e)
    
@route('/api/del_rtst_in_memory', method=("POST","OPTIONS"))
def api_find():
    allowCROS()
    try:
        data = request.json
        memory_name=data.get("memory_name")
        del vectorstores[memory_name]
    except Exception as e:
        return str(e)

@route('/api/save_news', method=("POST","OPTIONS"))
def save_news():
    allowCROS()
    try:
        data = request.json
        if not data:
            return 'no data'
        title = data.get('title')
        txt = data.get('txt')
        cut_file = f"txt/{title}.txt"
        with open(cut_file, 'w', encoding='utf-8') as f:
            f.write(txt)
            f.close()
        return 'success'
    except Exception as e:
        return(e)

@route('/api/read_news/:path', method=("GET","OPTIONS"))
def read_news(path=""):
    allowCROS()
    return static_file(path, root="txt/")
