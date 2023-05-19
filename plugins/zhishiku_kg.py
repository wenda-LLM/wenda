
from plugins.common import settings
import requests
import json
session = requests.Session()
cunnrent_setting=settings.librarys.kg
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'}
proxies = {"http": None,"https": None,}


def find(search_query,step = 0):
    url = cunnrent_setting.kg_qa_host
    res = session.get(url, headers=headers, proxies=proxies,json={
					"question": search_query
				})
    r = res.ret
    result = ""
    if(r.list):
        for kg in r :
            result += kg.entity1 + kg.rel + kg.entity2 + ","
    return json.loads(result)

