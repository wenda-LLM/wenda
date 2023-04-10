
set "WINPYDIR=%~dp0\WPy64-38100\python-3.8.10.amd64"
set "PATH=%WINPYDIR%\;%WINPYDIR%\DLLs;%WINPYDIR%\Scripts;%PATH%;"

set logging=1
rem 日志

set PORT=17860
rem WebUI 默认启动端口号

set "PYTHON=%WINPYDIR%\python.exe "
rem python程序位置，不使用改为本地路径

set glm_path=model\chatglm-6b-int4
rem glm模型位置


set "glm_strategy=cuda fp16"


rem glm 模型参数  支持：
rem "cuda fp16"  所有glm模型 要直接跑在gpu上都可以使用这个参数
rem "cuda fp16i8"  fp16原生模型 要自行量化为int8跑在gpu上可以使用这个参数
rem "cuda fp16i4"  fp16原生模型 要自行量化为int4跑在gpu上可以使用这个参数
rem "fp16i4 cuda " 先量化再cuda，解决显存不够问题
rem "fp16i8 cuda "  先量化再cuda，解决显存不够问题
rem "cpu fp32"  所有glm模型 要直接跑在cpu上都可以使用这个参数
rem "cpu fp16i8" fp16原生模型 要自行量化为int8跑在cpu上可以使用这个参数
rem "cpu fp16i4" fp16原生模型要 自行量化为int4跑在cpu上可以使用这个参数
    
set glm_lora_path=
rem glm模型微调权重目录路径  为空则不加载LoRA

set rwkv_path=..\RWKV-4-Raven-7B-v7-ChnEng-20230404-ctx2048.pth
rem rwkv模型位置

set "rwkv_strategy=cuda fp16i8 *18+"
rem rwkv模型参数

set rwkv_lora_path=""
rem rwkv模型lora微调权重目录路径  为空则不加载LoRA

set rwkv_lora_alpha="16"
rem rwkv模型lora微调权重alpha  和训练时所用值挂钩

set llm_type=glm6b
rem  LLM模型类型:glm6b、rwkv

set zsk_type=s
rem  知识库类型:s→传统索引；x→基于Sentence  Transformer 的向量数据库

set embeddings_path=model\simcse-chinese-roberta-wwm-ext
rem embeddings模型位置

set vectorstore_path=xw
rem vectorstore保存位置

set chunk_size=200
rem chunk_size

set chunk_count=3
rem chunk_count