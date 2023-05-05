from plugins.common import settings
from plugins.common import error_print 
zsk=[]
input_list = settings.library.mix.strategy.split(" ")
for item in input_list:
    item=item.split(":")
    from importlib import import_module
    zhishiku = import_module('plugins.zhishiku_'+item[0])
    if zhishiku is None:
        error_print("载入知识库失败",item[0])
    zsk.append({'zsk':zhishiku,"count":int(item[1])})
def find(s,step = 0):
    result=[]
    for item in zsk:
        result+=item['zsk'].find(s,step)[:item['count']]
    return result[:int(settings.library.mix.count)]

