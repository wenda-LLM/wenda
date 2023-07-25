@echo off
call environment.bat
:a
"%PYTHON%" wenda.py -t generic_transformers
goto a
pause
exit /b