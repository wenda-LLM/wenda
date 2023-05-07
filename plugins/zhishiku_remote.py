
from plugins.common import settings
import requests
import json
session = requests.Session()
cunnrent_setting=settings.librarys.remote
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'}
proxies = {"http": None,"https": None,}


def find(search_query,step = 0):
    url = cunnrent_setting.host
    res = session.post(url, headers=headers, proxies=proxies,json={
					"prompt": search_query,
					"step": step
				})
    r = res.text
    return json.loads(r)

