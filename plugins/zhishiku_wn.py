import requests,json
from gerapy_auto_extractor import extract_list,extract_detail


session = requests.Session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'
}
def find(search_query):
    url = 'https://cn.bing.com/search?q={}'.format(search_query)
    res = session.get(url, headers=headers, verify = False).text


    extracted_data = extract_list(res)
    for index, item in enumerate(extracted_data):
        print(item)
   