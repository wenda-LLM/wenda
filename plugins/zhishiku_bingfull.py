import requests
import re
from bs4 import BeautifulSoup
from plugins.common import settings

import selenium
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

session = requests.Session()
# 正则提取摘要和链接
title_pattern = re.compile('<a.target=..blank..target..(.*?)</a>')
brief_pattern = re.compile('K=.SERP(.*?)</p>')
link_pattern = re.compile(
    '(?<=(a.target=._blank..target=._blank..href=.))(.*?)(?=(..h=))')
headers = {
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0',
    "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Language" : "zh-CN,zh;q=0.9",
    "Accept-Encoding" : "gzip, deflate, br",
    "DNT" : "1",
    "Connection" : "cloes"
}
proxies = {'https':None, 'http':None,}

def countchn(string):
    pattern = re.compile(u'[\u1100-\uFFFDh]+?')
    result = pattern.findall(string)
    chnnum = len(result)            #list的长度即是中文的字数
    possible = chnnum/len(str(string))         #possible = 中文字数/总字数
    return (chnnum, possible)

def findtext(part):    
    length = 100000
    l = []
    for paragraph in part:
        chnstatus = countchn(str(paragraph))
        possible = chnstatus[1]
        if possible > 0.05:         
            l.append(paragraph)
    l_t = l[:]
    paragraph_f = []
    #这里需要复制一下表，在新表中再次筛选，要不然会出问题，跟Python的内存机制有关
    for elements in l_t:
        chnstatus = countchn(str(elements))
        chnnum2 = chnstatus[0]
        if chnnum2 < 300:    
        #最终测试结果表明300字是一个比较靠谱的标准，低于300字的正文咱也不想要了对不
            l.remove(elements)
        elif len(str(elements))<length:
            # length = len(str(elements))
            # paragraph_f = elements
            paragraph_f.append(elements.text)
    return paragraph_f
    # return max(paragraph_f, key=len, default='')    # 返回最长的字符串

def selenium_read(url):
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument('headless')
    options.add_argument('--disable-gpu')
    ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0'
    options.add_argument(f'user-agent={ua}')
    options.headless = False  # 阻止弹出浏览器窗口，静默执行
    service = Service(executable_path=".\\chromedriver_win.exe")  # driver文件位置
    driver = webdriver.Chrome(service=service, options=options)
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {  # 去除selenium指纹
      "source": """
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      """
    })
    try:
        driver.get(url) # 这次返回的是 521 相关的防爬js代码
        driver.implicitly_wait(1)
        time.sleep(0.2)  # 多次等待模拟真实浏览器
        cookie = driver.get_cookies()
        time.sleep(0.2)
        for cc in range(0, len(cookie)):  # 使用动态cookies
            driver.add_cookie(cookie[cc])
            time.sleep(0.1)
        driver.get(url)  # 调用2次 browser.get 解决 521 问题 
        time.sleep(0.2)
        
        html = driver.page_source
        driver.quit()
        
        return html
    except:
        return "Connection Timeout"

def find(search_query,step = 0,max_title = 5):
    # max_title:最多点击的条目数，由于爬取网站耗时较多，不建议设置的太大
    url = 'https://cn.bing.com/search?q={}'.format(search_query)
    res = session.get(url, headers=headers, proxies=proxies)
    r = res.text

    title = title_pattern.findall(r)
    brief = brief_pattern.findall(r)
    link = link_pattern.findall(r)

    # 数据清洗
    clear_content = []
    for i in range(min(len(link), int(max_title))):
        content_r = ""
        try:
            href = link[i][1]
            html_text = selenium_read(href)
            soup = BeautifulSoup(html_text, 'html.parser')
            part = soup.select('div')
            para_f = findtext(part)
        except:
            para_f = []
            
        tmp = re.sub('<[^<]+?>', '', brief[i]).replace('\n', '').strip()
        tmp = re.sub('^.*&ensp;', '', tmp).replace('\n', '').strip()
        brief_r = re.sub('^.*>', '', tmp).replace('\n', '').strip()
        matched_indicator = brief_r[0:5]
        
        ct = brief_r
        for content_r in para_f:
            tmp = re.sub('<[^<]+?>', '', content_r).replace('\n', '').strip()
            tmp = re.sub('^.*&ensp;', '', tmp).replace('\n', '').strip()
            content_r = re.sub('^.*>', '', tmp).replace('\n', '').strip()
            
            idx = content_r.find(matched_indicator)
            if idx != -1:
                start_idx = int(max(idx-800, 0))
                end_idx = int(min(idx+1800, len(content_r)))
                ct = content_r[start_idx:end_idx]
                break
            
        print(str(i+1)+"/"+str(len(link)))
        print(link[i][1])
        print(ct)
        clear_content.append(ct)

    clear_title = []
    for i in range(min(len(title), int(max_title))):
        title_i = title[i]
        tmp = re.sub('^.*?>', '', title_i).replace('\n', '').strip()
        tmp2 = re.sub('<[^<]+?>', '', tmp).replace('\n', '').strip()
        clear_title.append(tmp2)

    return [{'title': "["+clear_title[i]+"]("+link[i][1]+")", 'content':clear_content[i]}
            for i in range(min(int(settings.librarys.bing.count), len(clear_content)))]
