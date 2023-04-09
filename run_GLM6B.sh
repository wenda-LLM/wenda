# /bin/bash
source setting.sh
export llm_type="glm6b"
if [ -z "$PYTHON" ]; then
    python wenda.py
else
    $PYTHON wenda.py
fi
