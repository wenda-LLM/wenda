@echo off
call settings.bat
:a
%PYTHON% GLM6BAPI.py
goto a
pause
exit /b