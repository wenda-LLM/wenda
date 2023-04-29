@echo off
call envirment.bat
:a
%PYTHON% wenda.py -t rwkv
goto a
pause
exit /b