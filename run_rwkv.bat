@echo off
call settings.bat
:a
%PYTHON% rwkvAPI.py
goto a
pause
exit /b