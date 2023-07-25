@echo off
call environment.bat
set OPENAI_API_KEY=123
:a
"%PYTHON%" wenda.py -t openai
goto a
pause
exit /b