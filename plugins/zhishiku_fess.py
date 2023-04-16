import requests
import re,json
from plugins.settings import settings
# encoding=utf-8
import jieba
 
seg_list = jieba.cut_for_search("小明硕士毕业于中国科学院计算所，后在日本京都大学深造")  # 搜索引擎模式
print(" ".join(seg_list))
 
session = requests.Session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'}
proxies = {"http": None,"https": None,}

def replace_strong(s):
    s=re.sub(r'<strong>', "", s)
    s=re.sub(r'</strong>', "", s)
    return s
def find(search_query):
    try:
        search_query=' '.join(jieba.cut(search_query) )
        print("关键词：",search_query)
        url = 'http://' + settings.library.fess.Fess_Host + '/json/?q={}&num=10&sort=score.desc&lang=zh_CN'.format(search_query)
        res = session.get(url, headers=headers, proxies=proxies)
        r = res.json()
        r=r["response"]['result']
        # "<strong>""</strong>"
        return [{'title': r[i]['title'], 'content':replace_strong(r[i]['content_description'])}
                for i in range(min(int(settings.library.fess.Count), len(r)))]
    except Exception  as e:
        print("fess读取失败",e)
        return []
