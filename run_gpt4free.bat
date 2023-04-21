@echo off
call settings.bat
:a
rem"%PYTHON%" wenda.py -t gpt4free_writesonic
%PYTHON% wenda.py -t "gpt4free_you"
goto a
pause
exit /b