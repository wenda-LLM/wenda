@echo off
call settings.bat
:a
%PYTHON% wenda.py -t llama
goto a
pause
exit /b