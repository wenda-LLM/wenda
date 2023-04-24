@echo off
call settings.bat
:a
%PYTHON% wenda.py -t wudao
goto a
pause
exit /b