@echo off
call envirment.bat
:a
rem %PYTHON% llms\rwkvcpp\convert_pytorch_to_ggml.py model/RWKV-4-Raven-7B-v11.pth model/rwkv_ggml_f16.bin float16
%PYTHON% llms\rwkvcpp\quantize.py model/rwkv_ggml_f16.bin model/rwkv_ggml_q8.bin Q8_0
pause
exit /b