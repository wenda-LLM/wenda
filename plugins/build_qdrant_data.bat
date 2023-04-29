@echo off
cd ..
call envirment.bat
%PYTHON% plugins/gen_data_qdrant.py
pause