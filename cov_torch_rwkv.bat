@echo off
call environment.bat
:a
%PYTHON% llms/convert_rwkv.py
pause
exit /b