#!/bin/bash
export logging="True"
# 日志

export PYTHON="venv/pytorch_2.1/bin/python"
# python程序位置，可搭配一键包或是省去每次切换环境

export glm_path="model/chatglm-6b"
# glm模型位置

export glm_strategy="cuda fp16"
# glm 模型参数  支持：
# "cuda fp16"  所有glm模型 要直接跑在gpu上都可以使用这个参数
# "cpu fp32"  所有glm模型 要直接跑在cpu上都可以使用这个参数
# "cuda fp16i8"  fp16原生模型 要自行量化为int8跑在gpu上可以使用这个参数
# "cpu fp16i8" fp16原生模型 要自行量化为int8跑在cpu上可以使用这个参数
# "cuda fp16i4"  fp16原生模型 要自行量化为int4跑在gpu上可以使用这个参数
# "cpu fp16i4" fp16原生模型要 自行量化为int4跑在cpu上可以使用这个参数
    

export glm_lora_path=""
# glm模型lora微调权重目录路径  为空则不加载LoRA

export rwkv_path="model/RWKV-4-Raven-7B-v7-ChnEng-20230404-ctx2048.pth"
# rwkv模型位置

export rwkv_strategy="cuda fp16"
# rwkv模型参数

export rwkv_lora_path=""
# rwkv模型lora微调权重目录路径  为空则不加载LoRA

export rwkv_lora_alpha="16"
# rwkv模型lora微调权重alpha  和训练时所用值挂钩

export llm_type="glm6b"
#  LLM模型类型:glm6b、rwkv

export zsk_type="x"
#  知识库类型:
#  s→传统索引
#  x→基于Sentence  Transformer 的向量数据库
#  bing→cn.bing搜索，仅国内可用
#  bingxs→cn.bing学术搜索，仅国内可用
#  bingsite→cn.bing站内搜索，仅国内可用，需设置网址：
# cn.bing站内搜索网址:
# export site=www.jianbiaoku.com
#  建标库
export site="www.12371.cn"
#  共产党员网

export zsk_folder="zsk"
#  知识库的文件夹目录名称，若留空则为txt

export embeddings_path="model/simcse-chinese-roberta-wwm-ext"
# embeddings模型位置

export vectorstore_path="xw"
# vectorstore保存位置

export chunk_size=400
# chunk_size

export chunk_count=3
# chunk_count