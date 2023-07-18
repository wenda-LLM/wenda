@echo off
call environment.bat
:a
"%PYTHON%" wenda.py -t baichuan
goto a
pause
exit /b