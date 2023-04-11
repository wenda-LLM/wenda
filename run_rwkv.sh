#!/bin/bash
source setting.sh
export llm_type="rwkv"
if [ -z "$PYTHON" ]; then
    python wenda.py
else
    $PYTHON wenda.py
fi
