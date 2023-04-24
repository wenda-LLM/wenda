@echo off
call settings.bat
:a
%PYTHON% wenda.py -t moss
goto a
pause
exit /b