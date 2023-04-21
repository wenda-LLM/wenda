@echo off
call settings.bat
:a
"%PYTHON%" wenda.py -t gpt4free_writesonic
rem "%PYTHON%" wenda.py -t "gpt4free_you"
goto a
pause
exit /b