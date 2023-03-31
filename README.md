# 闻达：一个大型语言模型调用平台
主要功能：
1. 目前支持模型：chatGLM-6B、chatRWKV、chatYuan。
2. 在chatGLM-6B模型实现chatPDF功能
3. 支持参数在线调整
4. 支持chatGLM-6B流式输出和输出过程中中断
5. 自动保存对话历史至浏览器（多用户同时使用不会冲突）
6. 删除单条对话历史
7. 支持局域网、内网部署和多用户同时使用。多用户同时使用中会自动排队，并显示当前用户。（内网部署需手动将前段静态资源切换成本地）
---
chatRWKV生成小说
![chatRWKV生成小说](imgs/novel.png)
设置和预设功能
![设置和预设功能](imgs/setting.png)
预设功能使用
![预设功能使用](imgs/func.png)

## 懒人包
链接：https://pan.baidu.com/s/105nOsldGt5mEPoT2np1ZoA?pwd=lyqz 
提取码：lyqz
包含程序主体和chatGLM-6B、chatYuan，分部是独立的压缩文件。chatRWKV模型更新频繁，请去官方链接下最新的。

## 安装
### 1.安装库
```bottle
paste
sqlalchemy
sqlalchemy_utils
```
### 2.日志功能
打开功能，需要打开相应模型API文件，改第六行`logging=False`为`logging=True`。
## chatPDF功能(在chatGLM-6B模型实现）
下载[simcse-chinese-roberta-wwm-ext](https://huggingface.co/cyclone/simcse-chinese-roberta-wwm-ext)，放在sentence-transformers\simcse-chinese-roberta-wwm-ext。
完整安装requirements.txt
## chatGLM-6B
GLM6BAPI.py 
模型默认位置：model\chatglm-6b-int4
## chatRWKV
rwkvAPI.py 
模型默认位置：RWKV-4-Pile-7B-EngChn-testNovel-2119-ctx2048-20230313.pth
## chatYuan
YuanAPI.py
模型默认位置：ChatYuan-large-v2
## TODO
### 1.详细说明和教程
### 2.chatRWKV历史对话支持
### 3.chatYuan在线参数调整支持

