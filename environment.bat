chcp 65001
title 闻达
reg add HKEY_CURRENT_USER\Console /v QuickEdit /t REG_DWORD /d 00000000 /f
rem 关闭快速编辑模式，防止大神暂停了还说程序有bug
cls
set "WINPYDIR=%~dp0\WPy64-31110\python-3.11.1.amd64"
IF EXIST %WINPYDIR% (
echo 检测到集成环境
set "PATH=%WINPYDIR%\;%WINPYDIR%\DLLs;%WINPYDIR%\Scripts;%PATH%;"
set "PYTHON=%WINPYDIR%\python.exe "
goto end
) 
set "WINPYDIR=%~dp0\..\WPy64-31110\python-3.11.1.amd64"
IF EXIST %WINPYDIR% (
echo 检测到集成环境
set "PATH=%WINPYDIR%\;%WINPYDIR%\DLLs;%WINPYDIR%\Scripts;%PATH%;"
set "PYTHON=%WINPYDIR%\python.exe "
goto end
) 
set "WINPYDIR=%~dp0\..\runner\py310"
IF EXIST %WINPYDIR% (
echo 检测到RWKV-Runner集成环境
set "PATH=%WINPYDIR%\;%WINPYDIR%\DLLs;%WINPYDIR%\Scripts;%PATH%;"
set "PYTHON=%WINPYDIR%\python.exe "
goto end
) 
IF EXIST python (
echo 未检测到集成环境，使用系统Python解释器
set "PYTHON=python.exe "
)ELSE (
)
:end