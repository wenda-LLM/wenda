# 闻达：一个大型语言模型调用平台
目前支持chatGLM-6B、chatRWKV、chatYuan。
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
### 1.除官方所需外，安装以下库：`bottle、paste`:
`pip install bottle
pip install paste`
### 2.日志功能
打开功能，需要打开相应模型API文件，改第六行`logging=False`为`logging=True`，安装`sqlalchemy`、`sqlalchemy_utils`。
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

