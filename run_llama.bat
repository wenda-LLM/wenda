@echo off
call environment.bat
:a
%PYTHON% wenda.py -t llama
goto a
pause
exit /b