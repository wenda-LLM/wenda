#!/bin/bash
source setting.sh
export llm_type="rwkv"
while true
do
    if [ -z "$PYTHON" ]; then
        python wenda.py
    else
        $PYTHON wenda.py
    fi
sleep 1
done
