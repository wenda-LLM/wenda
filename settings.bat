@echo off

set PYTHON=%~dp0\WPy64-31090\python-3.10.9.amd64\python.exe 
%python程序位置，不使用懒人包可留空%

set glm_path=model\chatglm-6b-int4
%glm模型位置%

set embeddings_path=model\simcse-chinese-roberta-wwm-ext
%embeddings模型位置%

set vectorstore_path=xw
%vectorstore保存位置%