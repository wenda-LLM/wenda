@echo off
call environment.bat
:a
%PYTHON% wenda.py -t rwkv
goto a
pause
exit /b