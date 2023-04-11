@echo off
call settings.bat
set llm_type=rwkv
:a
%PYTHON% wenda.py
goto a
pause
exit /b