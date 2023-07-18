@echo off
%~d0
cd %~dp0
call environment.bat
:a
"%PYTHON%" wenda.py -t glm6b
goto a
pause
exit /b