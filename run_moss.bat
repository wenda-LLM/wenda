@echo off
call envirment.bat
:a
%PYTHON% wenda.py -t moss
goto a
pause
exit /b