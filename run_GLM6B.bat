@echo off
call settings.bat
set llm_type=glm6b
rem  LLM模型类型:glm6b
:a
%PYTHON% wenda.py
goto a
pause
exit /b