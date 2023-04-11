@echo off
call settings.bat
%PYTHON% plugins/gen_data_%zsk_type%.py
pause
exit /b