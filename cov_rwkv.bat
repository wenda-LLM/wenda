@echo off
call settings.bat
:a
%PYTHON% convert_rwkv.py
pause
exit /b