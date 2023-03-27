@echo off
set PYTHON=%~dp0\py310\\python.exe
:a
%PYTHON% GLM6BAPI.py
goto a
pause
exit /b