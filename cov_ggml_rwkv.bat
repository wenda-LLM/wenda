@echo off
call environment.bat
%PYTHON% llms\rwkvcpp\convert_pytorch_to_ggml.py model/RWKV-4-World-0.4B-v1-20230529-ctx4096.pth model/rwkv_ggml_f16.bin float16
%PYTHON% llms\rwkvcpp\quantize.py model/rwkv_ggml_f16.bin model/rwkv_ggml_q8.bin Q8_0
pause
exit /b