import http.client
import json
import os
SERPER_API_KEY=os.getenv("SERPER_API_KEY")
def find(search_query,step = 0):
    conn = http.client.HTTPSConnection("google.serper.dev")
    payload = json.dumps({
    "q": search_query,
    })
    headers = {
    'X-API-KEY': SERPER_API_KEY,
    'Content-Type': 'application/json'
    }
    conn.request("POST", "/search", payload, headers)
    res = conn.getresponse()
    data = res.read()
    data=json.loads(data)
    print(data)
    l=[{'title': "["+organic["title"]+"]("+organic["link"]+")", 'content':organic["snippet"]} for organic in data['organic']]
    try:
        if data.get("answerBox"):
            answer_box = data.get("answerBox", {})
            l.insert(0,{'title': "[answer："+answer_box["title"]+"]("+answer_box["link"]+")", 'content':answer_box["snippet"]})
    except:
        pass
    return l
