@echo off
call envirment.bat
:a
%PYTHON% wenda.py -t llama
goto a
pause
exit /b