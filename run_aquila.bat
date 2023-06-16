@echo off
call envirment.bat
:a
"%PYTHON%" wenda.py -t aquila
goto a
pause
exit /b