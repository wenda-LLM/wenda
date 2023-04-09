@echo off
call settings.bat
set llm_type=rwkv
rem  LLM模型类型:rwkv
:a
%PYTHON% wenda.py
goto a
pause
exit /b