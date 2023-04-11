@echo off
call settings.bat
set llm_type=llama
:a
%PYTHON% wenda.py
goto a
pause
exit /b