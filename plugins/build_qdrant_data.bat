@echo off
cd ..
call environment.bat
%PYTHON% plugins/gen_data_qdrant.py
pause