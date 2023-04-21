#!/bin/bash
PYTHON="/mnt/data/anaconda3/envs/ChatCBM/bin/python"
# python程序位置，可搭配一键包或是省去每次切换环境

while true
do
    if [ -z "$PYTHON" ]; then
        python wenda.py -t moss -p 17861
    else
        $PYTHON wenda.py -t moss -p 17861
    fi
sleep 1
done
