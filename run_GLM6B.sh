# /bin/bash
source setting.sh
export llm_type="glm6b"
if [ -z "$PYTHON" ]; then
    CUDA_VISIBLE_DEVICES=1 python wenda.py
else
    CUDA_VISIBLE_DEVICES=1 $PYTHON wenda.py
fi
