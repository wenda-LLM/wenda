# /bin/bash
export logging=True
# 日志

export PYTHON="venv/Pytorch_2.1/bin/python"
# python程序位置，可搭配一键包或是省去每次切换环境

export glm_path="model/chatglm-6b-int4"
# glm模型位置


export rwkv_path="model/RWKV-4-Raven-7B-v7-ChnEng-20230404-ctx2048.pth"
# rwkv模型位置
export rwkv_strategy="cuda fp16i8 *18+"
# rwkv模型参数

export zsk_type="x"
# 知识库类型:s->传统索引；x->基于Sentence  Transformer 的向量数据库

export embeddings_path="model/simcse-chinese-roberta-wwm-ext"
# embeddings模型位置
export vectorstore_path="xw"
# vectorstore保存位置

export chunk_size=200
# chunk_size
export chunk_count=3
# chunk_count