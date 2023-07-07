@echo off
call envirment.bat
:a
%PYTHON% wenda.py -t internlm
goto a
pause
exit /b