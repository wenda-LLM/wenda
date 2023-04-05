import threading,os,json
import datetime
from bottle import route, response, request,static_file,hook
import bottle
import settings
import torch
if settings.logging:
    from defineSQL import session_maker, 记录
mutex = threading.Lock()
glm_path=os.environ.get('glm_path')
@route('/static/:name')
def staticjs(name='-'):
    return static_file(name, root="views\static")
@route('/:name')
def static(name='-'):
    return static_file(name, root="views")
@route('/')
def index():
    return static_file("index.html", root="views")
当前用户=None
@route('/api/chat_now', method='GET')
def api_chat_now():
    return '当前用户：'+当前用户[0]+"\n问题："+当前用户[1]+"\n回答："+当前用户[2]+''
@hook('before_request')
def validate():
    REQUEST_METHOD = request.environ.get('REQUEST_METHOD')
    HTTP_ACCESS_CONTROL_REQUEST_METHOD = request.environ.get('HTTP_ACCESS_CONTROL_REQUEST_METHOD')
    if REQUEST_METHOD == 'OPTIONS' and HTTP_ACCESS_CONTROL_REQUEST_METHOD:
        request.environ['REQUEST_METHOD'] = HTTP_ACCESS_CONTROL_REQUEST_METHOD
@route('/api/save_news', method='OPTIONS')
@route('/api/save_news', method='POST')
def api_chat_stream():
    response.set_header('Access-Control-Allow-Origin', '*')
    response.add_header('Access-Control-Allow-Methods','POST,OPTIONS')
    response.add_header('Access-Control-Allow-Headers',
                        'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token')
    try:
        data = request.json
        if not data:return '0'
        title = data.get('title')
        txt = data.get('txt')
        cut_file=f"txt/{title}.txt"
        with open(cut_file, 'w',encoding='utf-8') as f:   
            f.write(txt)
            f.close()
        return '1'
    except Exception as e:
        print(e)
    return '2'
@route('/api/find', method='POST')
def api_find():
    data = request.json
    prompt = data.get('prompt')
    return json.dumps(find(prompt))
@route('/api/chat_stream', method='POST')
def api_chat_stream():
    data = request.json
    prompt = data.get('prompt')
    max_length = data.get('max_length')
    if max_length is None:
        max_length = 2048
    top_p = data.get('top_p')
    if top_p is None:
        top_p = 0.7
    temperature = data.get('temperature')
    if temperature is None:
        temperature = 0.9
    pdf = data.get('pdf')
    if pdf is None:
        pdf = False
    history = data.get('history')
    history_formatted = None
    if history is not None:
        history_formatted = []
        tmp = []
        for i, old_chat in enumerate(history):
            if len(tmp) == 0 and old_chat['role'] == "user":
                tmp.append(old_chat['content'])
            elif old_chat['role'] == "AI":
                tmp.append(old_chat['content'])
                history_formatted.append(tuple(tmp))
                tmp = []
            else:
                continue
    response=''
    # print(request.environ)
    IP=request.environ.get('HTTP_X_REAL_IP') or request.environ.get('REMOTE_ADDR')
    global 当前用户
    with mutex:
        footer='///'
        if pdf:
            response_d=qa({"question": prompt, "chat_history": []})
            output_sources = [
                        c.metadata for c in list(response_d["source_documents"])
                    ]
            output_sources = [ i['source'].replace("txt_out\\","") for i in output_sources]
            # print(output_sources)
            prompt=  response_d ["answer"]
            footer=  "\n来源：\n"+('\n').join(output_sources)+'///'
        yield str(len(prompt))+'字正在计算///'
        
        print( f"\033[1;32m{IP}:\033[1;31m{prompt}\033[1;37m")
        try:
            for response, history in model.stream_chat(tokenizer, prompt, history_formatted, max_length=max_length, top_p=top_p,temperature=temperature):
                当前用户=[IP,prompt,response]
                if(response):yield response+footer
        except Exception as e:
            # pass
            print("错误",str(e),e)
            response=''
        torch.cuda.empty_cache() 
    if response=='':
            yield "发生错误，正在重新加载模型"+'///'
            os._exit(0)
    if settings.logging:
        with session_maker() as session:
            jl = 记录(时间=datetime.datetime.now(),IP=IP,问= prompt,答=response)
            session.add(jl)
            session.commit()
    print(response)
    yield "/././"
model=None
tokenizer=None
from langchain.llms.base import LLM
from typing import Optional, List
class ChatGLM_G(LLM):
    @property
    def _llm_type(self) -> str:
        return "ChatGLM_G"
    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        return prompt

def load_model():
    global model,tokenizer,当前用户
    mutex.acquire()
    当前用户=['模型加载中','','']
    from transformers import AutoModel, AutoTokenizer
    tokenizer = AutoTokenizer.from_pretrained(settings.glm_path, local_files_only=True, trust_remote_code=True)
    model = AutoModel.from_pretrained(settings.glm_path, local_files_only=True, trust_remote_code=True)
    model = model.half()
    model = model.cuda()
    model = model.eval()
    mutex.release()
thread_load_model = threading.Thread(target=load_model)
thread_load_model.start()
from langchain.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(model_name=settings.embeddings_path)

from langchain.vectorstores.faiss import FAISS
from langchain.prompts.prompt import PromptTemplate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import ChatVectorDBChain
vectorstore = FAISS.load_local(settings.vectorstore_path, embeddings=embeddings)
def find(s):
    return [document_to_dict(d) for d in vectorstore.similarity_search(s)]


def document_to_dict(d):
    return {'c':d.page_content,'s':d.metadata['source']}

def init_agent():
    system_template = """使用以下文段, 回答用中文用户问题。如果无法从中得到答案，请说"没有足够的相关信息"。
----------------
{context}
----------------
"""
    messages = [
        SystemMessagePromptTemplate.from_template(system_template),
        HumanMessagePromptTemplate.from_template("{question}"),
    ]
    prompt = ChatPromptTemplate.from_messages(messages)
    condese_propmt_template = """任务: 给一段对话和一个后续问题，将后续问题改写成一个独立的问题。(确保问题是完整的, 没有模糊的指代)
聊天记录：
{chat_history}
###
后续问题：{question}
改写后的独立, 完整的问题："""
    new_question_prompt = PromptTemplate.from_template(condese_propmt_template)
    # print(new_question_prompt)
    qa = ChatVectorDBChain.from_llm(
        llm=ChatGLM_G(),
        vectorstore=vectorstore,
        qa_prompt=prompt,
        condense_question_prompt=new_question_prompt,
    )
    qa.return_source_documents = True
    qa.top_k_docs_for_context = 1
    return qa
qa=init_agent()
bottle.debug(True)
bottle.run(server='paste',port=17860,quiet=True)
