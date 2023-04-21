@echo off
call settings.bat
rem set OPENAI_API_KEY=123
:a
"%PYTHON%" wenda.py -t openai
goto a
pause
exit /b