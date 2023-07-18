@echo off
call environment.bat
:a
"%PYTHON%" wenda.py -t replitcode
goto a
pause
exit /b