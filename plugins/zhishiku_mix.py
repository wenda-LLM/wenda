from plugins.settings import settings
zsk=[]
input_list = settings.library.mix.Strategy.split(" ")
for item in input_list:
    item=item.split(":")
    # print(item)
    from importlib import import_module
    zhishiku = import_module('plugins.zhishiku_'+item[0])
    zsk.append({'zsk':zhishiku,"count":int(item[1])})
def find(s):
    result=[]
    for item in zsk:
        result+=item['zsk'].find(s)[:item['count']]
    return result[:int(settings.library.mix.Count)]

