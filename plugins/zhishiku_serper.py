import http.client
import json
import os
SERPER_API_KEY=os.getenv("SERPER_API_KEY")
def find(search_query,step = 0):
    conn = http.client.HTTPSConnection("google.serper.dev")
    payload = json.dumps({
    "q": search_query,
    "gl": "cn",
    "hl": "zh-cn"
    })
    headers = {
    'X-API-KEY': SERPER_API_KEY,
    'Content-Type': 'application/json'
    }
    conn.request("POST", "/search", payload, headers)
    res = conn.getresponse()
    data = res.read()
    data=json.loads(data)
    return [{'title': "["+organic["title"]+"]("+organic["link"]+")", 'content':organic["snippet"]} for organic in data['organic']]
