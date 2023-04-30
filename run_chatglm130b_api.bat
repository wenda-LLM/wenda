@echo off
call envirment.bat
:a
%PYTHON% wenda.py -t chatglm
goto a
pause
exit /b