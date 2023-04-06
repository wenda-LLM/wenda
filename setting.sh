# /bin/bash
export logging=True
# 日志

export glm_path="model/chatglm-6b"
# glm模型位置


export rwkv_path="model/RWKV-4-Raven-7B-v7-ChnEng-20230404-ctx2048.pth"
# rwkv模型位置
export rwkv_strategy="cuda fp16"
# rwkv模型参数

export chunk_size=100
# chunk_size
export chunk_count=3
# chunk_count