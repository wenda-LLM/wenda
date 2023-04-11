#!/bin/bash
source setting.sh
export llm_type="glm6b"
while true
do
    if [ -z "$PYTHON" ]; then
        python wenda.py
    else
        $PYTHON wenda.py
    fi
sleep 1
done
