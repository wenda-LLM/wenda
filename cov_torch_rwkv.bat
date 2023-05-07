@echo off
call envirment.bat
:a
%PYTHON% llms/convert_rwkv.py
pause
exit /b