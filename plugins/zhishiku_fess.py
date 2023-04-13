import requests
import re,json
from plugins import settings
session = requests.Session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'}
proxies = {"http": None,"https": None,}

def replace_strong(s):
    s=re.sub(r'<strong>', "", s)
    s=re.sub(r'</strong>', "", s)
    return s
def find(search_query):
    url = 'http://127.0.0.1:8080/json/?q={}&num=10&sort=score.desc&lang=zh_CN'.format(search_query)
    res = session.get(url, headers=headers, proxies=proxies)
    r = res.json()
    r=r["response"]['result']
    # "<strong>""</strong>"
    return [{'title': r[i]['title'], 'content':replace_strong(r[i]['content_description'])}
            for i in range(min(settings.chunk_count, len(r)))]
