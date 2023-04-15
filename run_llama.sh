#!/bin/bash
PYTHON=""
# python程序位置，可搭配一键包或是省去每次切换环境

while true
do
    if [ -z "$PYTHON" ]; then
        python wenda.py -t llama
    else
        $PYTHON wenda.py -t llama
    fi
sleep 1
done
