import os

glm_path=os.environ.get('glm_path')
print('glm模型地址',glm_path)
embeddings_path =os.environ.get('embeddings_path')
print('embeddings模型地址',embeddings_path)
vectorstore_path =os.environ.get('vectorstore_path')
print('vectorstore保存地址',vectorstore_path)
rwkv_path =os.environ.get('rwkv_path')
print('rwkv模型地址',rwkv_path)

rwkv_strategy =os.environ.get('rwkv_strategy')
print('rwkv模型参数',rwkv_strategy)

logging =bool(os.environ.get('logging'))
print('日志记录',logging)