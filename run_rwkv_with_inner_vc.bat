@echo off
call  "..\vc\VC\Auxiliary\Build\vcvars64.bat"
call envirment.bat
set RWKV_CUDA_ON=1
:a
%PYTHON% wenda.py -t rwkv
goto a
pause
exit /b