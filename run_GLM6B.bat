@echo off
call envirment.bat
:a
"%PYTHON%" wenda.py -t glm6b
goto a
pause
exit /b