@echo off
call environment.bat
set HF_ENDPOINT=https://hf-mirror.com
huggingface-cli download --resume-download --local-dir-use-symlinks False TheBloke/SUS-Chat-34B-AWQ --local-dir model/SUS-Chat-34B-AWQ
pause