import requests
from bottle import route, response, request, static_file, hook
import bottle
from plugins.common import settings
@route('/api/sd_agent', method=("POST","OPTIONS"))
def api_find():
    url = "http://127.0.0.1:786"
    response = requests.post(url=f'{url}/sdapi/v1/txt2img', json=request.json)
    r = response.text
    return r

def find(search_query,step = 0):
    return []
