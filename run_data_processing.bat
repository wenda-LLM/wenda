@echo off
call settings.bat
%PYTHON% gen_data.py
pause
exit /b