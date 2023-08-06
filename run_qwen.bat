@echo off
call environment.bat
:a
"%PYTHON%" wenda.py -t qwen
goto a
pause
exit /b