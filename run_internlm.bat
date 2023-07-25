@echo off
call environment.bat
:a
%PYTHON% wenda.py -t internlm
goto a
pause
exit /b