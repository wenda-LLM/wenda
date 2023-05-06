from plugins.common import settings
from plugins.common import error_print 

# 根据前端需求动态查找知识库相关信息
# s=要查询的内容
# step=分多少步查询
# count=知识抽取的数量
# paraJson=参数包，以json字符串的形式编写
# 知识库配置模式，冒号前面是知识库类别，后面是拟抽取的数量，示例 paraJson.libraryStategy:"bing:2 bingsite:3 fess:2 rtst:3 sogowx:2"
# 知识库最大抽取条目的数量，paraJson.maxItmes

def find_dynamic(s,step = 0,paraJson = {'libraryStategy':"bing:2 bingsite:3 fess:2 rtst:3 sogowx:2",'maxItmes':10}):
    zsk=[]
    input_list = paraJson['libraryStategy'].split(" ")
    for item in input_list:
        item=item.split(":")
        from importlib import import_module
        zhishiku = import_module('plugins.zhishiku_'+item[0])
        if zhishiku is None:
            error_print("载入知识库失败",item[0])
        zsk.append({'zsk':zhishiku,"count":int(item[1])})

    result=[]
    for item in zsk:
        result+=item['zsk'].find(s,step)[:item['count']]
    return result[:paraJson["maxItmes"]]

