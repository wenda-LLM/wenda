@echo off
cd ..
call settings.bat
%PYTHON% plugins/gen_data_qdrant.py
pause