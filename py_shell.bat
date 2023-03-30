@echo off
set PYTHON=%~dp0\py310\\python.exe
set PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:32
:a
%PYTHON%
goto a
pause
exit /b