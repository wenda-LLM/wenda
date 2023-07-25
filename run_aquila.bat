@echo off
call environment.bat
:a
"%PYTHON%" wenda.py -t aquila
goto a
pause
exit /b