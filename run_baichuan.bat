@echo off
call envirment.bat
:a
"%PYTHON%" wenda.py -t baichuan
goto a
pause
exit /b