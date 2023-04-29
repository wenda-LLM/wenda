@echo off
call envirment.bat
:a
%PYTHON% convert_rwkv.py
pause
exit /b