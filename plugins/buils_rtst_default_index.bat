@echo off
%~d0
cd %~dp0
cd ..
call environment.bat
%PYTHON% plugins/gen_data_st.py
pause