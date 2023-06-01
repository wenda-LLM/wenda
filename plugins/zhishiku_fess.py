import requests
import re,json
from plugins.common import settings
# encoding=utf-8
import jieba
with open("plugins/stopwords_txt",encoding = "utf-8") as f:
    stopwords=f.read().split('\n')
session = requests.Session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'}
proxies = {"http": None,"https": None,}

def replace_strong(s):
    s=re.sub(r'<strong>', "", s)
    s=re.sub(r'</strong>', "", s)
    return s
def remove_stopwords(search_query):
    search_query_without_stopwords=[]
    for i in search_query:
        try:
            stopwords.index(i)
            search_query_without_stopwords.append("########")
        except:
            search_query_without_stopwords.append(i)
    return search_query_without_stopwords
def removeduplicate(list1):
    """
    列表套字典去重复
    :param list1: 输入一个有重复值的列表
    :return: 返回一个去掉重复的列表
    """
    newlist = []
    for i in list1:  # 先遍历原始字典
        flag = True
        if newlist == []:  # 如果是空的列表就不会有重复，直接往里添加
            pass
        else:
            for j in newlist:
                for key in i.keys():
                    if i['_id']  == j['_id']:
                        flag = False
        if flag:
            newlist.append(i)
    return newlist
def find(search_query,step = 0):
    try:
        search_query=jieba.cut(search_query)
        search_query=remove_stopwords(search_query)
        search_query=" ".join(search_query)
        print("关键词：",search_query)
        rest = []
        for i in search_query.split("########"):
            if len(i.strip())>0:
                url = 'http://' + settings.librarys.fess.fess_host + '/json/?q={}&num=10&sort=score.desc&lang=zh_CN'.format(i)
                res = session.get(url, headers=headers, proxies=proxies)
                r = res.json()
                r=r["response"]['result']
                # print('rrrrrrrrrrrrrrr',r)
                rest.extend(r)
            else:
                continue
        r = removeduplicate(rest)
        # print('restrestrestrestrestrest', r)
        # "<strong>""</strong>"
        return [{'title': r[i]['title'], 'content':replace_strong(r[i]['content_description'])}
                for i in range(min(int(settings.librarys.fess.count), len(r)))]
    except Exception  as e:
        print("fess读取失败",e)
        return []

from bottle import route, response, request, static_file, hook
import bottle
@route('/find_fess_zhishiku', method=("POST","OPTIONS"))
def upload_zhishiku():
    
    data = request.json
    prompt = data.get('prompt')
    try:
        url = 'http://' + settings.librarys.fess.fess_host + '/json/?q={}&num=10&sort=score.desc&lang=zh_CN'.format(prompt)
        res = session.get(url, headers=headers, proxies=proxies)
        r = res.json()
        r=r["response"]['result']
        # "<strong>""</strong>"
        return json.dumps( [{'title': r[i]['title'], 'content':replace_strong(r[i]['content_description'])}
                for i in range(min(int(settings.librarys.fess.count), len(r)))])
    except Exception  as e:
        print("fess读取失败",e)
        return json.dumps([])
