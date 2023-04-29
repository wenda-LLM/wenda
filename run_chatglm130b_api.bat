@echo off
call envirment.bat
:a
%PYTHON% wenda.py -t wudao
goto a
pause
exit /b