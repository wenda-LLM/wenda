@echo off
call settings.bat
:a
%PYTHON% wenda.py -t rwkv
goto a
pause
exit /b