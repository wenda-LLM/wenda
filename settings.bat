chcp 65001
title 闻达
set "WINPYDIR=%~dp0\WPy64-38100\python-3.8.10.amd64"
IF EXIST %WINPYDIR% (
echo 检测到集成环境，使用内置Python解释器
set "PATH=%WINPYDIR%\;%WINPYDIR%\DLLs;%WINPYDIR%\Scripts;%PATH%;"
set "PYTHON=%WINPYDIR%\python.exe "
goto end
) 
IF EXIST python (
echo 未检测到集成环境，使用系统Python解释器
)ELSE (
)
:end