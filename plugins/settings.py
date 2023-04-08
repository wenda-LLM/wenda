import os

glm_path=os.environ.get('glm_path')
print('glm模型地址',glm_path)

rwkv_path =os.environ.get('rwkv_path')
print('rwkv模型地址',rwkv_path)
rwkv_strategy =os.environ.get('rwkv_strategy')
print('rwkv模型参数',rwkv_strategy)

logging =bool(os.environ.get('logging'))
print('日志记录',logging)

zsk_type =os.environ.get('zsk_type')
print('知识库类型',zsk_type)
if zsk_type=='x':
    embeddings_path =os.environ.get('embeddings_path')
    print('embeddings模型地址',embeddings_path)
    vectorstore_path =os.environ.get('vectorstore_path')
    print('vectorstore保存地址',vectorstore_path)
def load_zsk():
    try:
        from importlib import import_module
        zhishiku = import_module('plugins.zhishiku_'+zsk_type)
        return zhishiku
    except  Exception as e:
        print("知识库加载失败，请阅读说明：https://github.com/l15y/wenda",e)


chunk_size =int(os.environ.get('chunk_size'))
print('chunk_size',chunk_size)
chunk_count =int(os.environ.get('chunk_count'))
print('chunk_count',chunk_count)
