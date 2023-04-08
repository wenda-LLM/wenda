@echo off
call settings.bat
%PYTHON% gen_data_s.py
pause
exit /b