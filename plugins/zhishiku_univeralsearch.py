import requests
from gerapy_auto_extractor import extract_list,extract_detail
#from selenium import webdriver  # 加载浏览器的库

session = requests.Session()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31'
}

def find(urlpath,search_query):
    url = urlpath+'{}'.format(search_query)
    #url = 'https://cn.bing.com/search?q={}'.format(search_query)
    #url = 'https://www.baidu.com/s?wd={}'.format(search_query)
    #url = 'https://cn.bing.com/academic?mkt=zh-CN'
    #url = 'https://www.google.com/search?q={}'.format(search_query)
    res=requests.get(url, headers=headers).text

    # 使用gerapy_auto_extractor提取列表数据
    extracted_data = extract_list(res)
    return extracted_data
