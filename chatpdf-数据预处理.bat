@echo off
set PYTHON=%~dp0\py310\\python.exe
%PYTHON% gen_data.py
pause
exit /b