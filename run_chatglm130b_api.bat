@echo off
call environment.bat
:a
%PYTHON% wenda.py -t chatglm
goto a
pause
exit /b