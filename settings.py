import os

glm_path=os.environ.get('glm_path')
print('glm模型地址',glm_path)

rwkv_path =os.environ.get('rwkv_path')
print('rwkv模型地址',rwkv_path)
rwkv_strategy =os.environ.get('rwkv_strategy')
print('rwkv模型参数',rwkv_strategy)

logging =bool(os.environ.get('logging'))
print('日志记录',logging)

chunk_size =int(os.environ.get('chunk_size'))
print('chunk_size',chunk_size)
chunk_count =int(os.environ.get('chunk_count'))
print('chunk_count',chunk_count)
