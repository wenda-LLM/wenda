@echo off
call environment.bat
SET HF_ENDPOINT=https://hf-mirror.com
huggingface-cli download --resume-download THUDM/chatglm3-6b --local-dir chatglm3-6b
pause