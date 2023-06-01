from plugins.common import settings
from plugins.common import error_print
from plugins.common import allowCROS
import json
from bottle import route, response, request, static_file, hook
zsk = []
try:
    input_list = settings.library.strategy.split(" ")
except:
    error_print("读取知识库参数失败，这可能是新版本知识库配置方式变化导致的，请参照配置文件进行修改。知识库仍将继续加载，并使用默认参数："+"sogowx:3 bingsite:2 rtst:2 agents:0")
    input_list = "sogowx:3 bingsite:2 rtst:2 agents:0".split(" ")
for item in input_list:
    item = item.split(":")
    from importlib import import_module
    zhishiku = import_module('plugins.zhishiku_'+item[0])
    if zhishiku is None:
        error_print("载入知识库失败", item[0])
    zsk.append({'zsk': zhishiku, "count": int(item[1])})


def find(s, step=0):
    result = []
    for item in zsk:
        result += item['zsk'].find(s, step)[:item['count']]
    return result[:int(settings.library.count)]


# 根据前端需求动态查找知识库相关信息
# s=要查询的内容
# step=分多少步查询
# count=知识抽取的数量
# paraJson=参数包，以json字符串的形式编写
# 知识库配置模式，冒号前面是知识库类别，后面是拟抽取的数量，示例 paraJson.libraryStategy:"bing:2 bingsite:3 fess:2 rtst:3 sogowx:2"
# 知识库最大抽取条目的数量，paraJson.maxItmes
@route('/find_dynamic', method=("POST", "OPTIONS"))
def api_find_dynamic():
    allowCROS()
    data = request.json
    if not data:
        return '0'
    prompt = data.get('prompt')
    step = data.get('step')
    paraJson = data.get('paraJson')  # 转成json对象

    if step is None:
        step = int(settings.library.step)

    if paraJson is None:
        paraJson = {
            'libraryStategy': "sogowx:2 bingsite:3 fess:2 rtst:3 bing:2", 'maxItmes': 10}

    print(type(paraJson))
    print(paraJson)

    return json.dumps(find_dynamic(prompt, int(step), paraJson))

def find_dynamic(s,step = 0,paraJson = {'libraryStategy':"bing:2 bingsite:3 fess:2 rtst:3:default sogowx:2",'maxItmes':10}):
    zsk=[]
    rtst_on=False
    rtst_name='default'
    input_list = paraJson['libraryStategy'].split(" ")
    
    # print('from dynamic:')
    
    for item in input_list:
        item=item.split(":")
        rtst_on=False
        from importlib import import_module
        zhishiku = import_module('plugins.zhishiku_'+item[0])
        if zhishiku is None:
            error_print("载入知识库失败",item[0])
        if len(item) >= 3:
            if item[0] == 'rtst' and item[2] != None:
               rtst_name=item[2]
               rtst_on=True
            #    print(rtst_name)
            # else:
            #     print('rtst 不存在')

        zsk.append({'zsk':zhishiku,"count":int(item[1]),'rtst_state':rtst_on})

    result=[]

    for item in zsk:
        # print(item)
        if(item['rtst_state']):
            result+=item['zsk'].find(s,step,rtst_name)[:item['count']]
        else:
            result+=item['zsk'].find(s,step)[:item['count']]
    return result[:paraJson["maxItmes"]]