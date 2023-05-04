@echo off
call envirment.bat
:a
"%PYTHON%" wenda.py -t replitcode
goto a
pause
exit /b