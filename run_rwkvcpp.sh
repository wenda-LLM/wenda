#!/bin/bash
PYTHON="/usr/bin/python3.9"
# python程序位置，可搭配一键包或是省去每次切换环境

while true
do
    if [ -z "$PYTHON" ]; then
        python wenda.py -t rwkvcpp
    else
        $PYTHON wenda.py -t rwkvcpp
    fi
sleep 1
done
