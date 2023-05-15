@echo off
%~d0
cd %~dp0
cd ..
call envirment.bat
%PYTHON% plugins/gen_data_st.py
pause