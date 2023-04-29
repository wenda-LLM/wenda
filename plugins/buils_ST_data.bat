@echo off
cd ..
call envirment.bat
%PYTHON% plugins/gen_data_st.py
pause