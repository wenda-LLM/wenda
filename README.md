# 闻达：一个大型语言模型调用平台
## 简介
1. 目前支持模型：chatGLM-6B、chatRWKV、chatYuan。
2. 在chatGLM-6B模型实现类chatPDF功能
3. 支持参数在线调整
4. 支持chatGLM-6B流式输出和输出过程中中断
5. 自动保存对话历史至浏览器（多用户同时使用不会冲突）
6. 删除单条对话历史
7. 支持局域网、内网部署和多用户同时使用。（内网部署需手动将前段静态资源切换成本地）
8. 多用户同时使用中会自动排队，并显示当前用户。

*欢迎同学们制作教学视频、懒人包等，做好请和我联系，我会把相关链接加到readme里*
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
旧版包含程序主体和chatGLM-6B、chatYuan，分部是独立的压缩文件。chatRWKV模型更新频繁，请去官方链接下最新的。不支持chatPDF功能
新版只有chatGLM-6B，重新制作，体积更新，包含各种优化，含chatPDF功能，推荐使用
## 安装
### 1.安装库
```pip install -r requirements.txt```
### 2.日志功能
打开功能，需要打开相应模型API文件，改第六行`logging=False`为`logging=True`。
## chatPDF功能(在chatGLM-6B模型实现）
### 准备
#### 1.下载中文sentence transformers模型
下载[simcse-chinese-roberta-wwm-ext](https://huggingface.co/cyclone/simcse-chinese-roberta-wwm-ext)，放在`model\simcse-chinese-roberta-wwm-ext`。
#### 2.索引语料
把自己的txt格式的文档放在名为txt的文件夹里，运行:
```run_data_processing.bat```
### 使用
chatGLM-6B正常使用中，勾选右上角chatPDF
## chatGLM-6B
运行`run_GLM6B.bat`
修改参数：修改`settings.bat`
模型默认位置：model\chatglm-6b-int4
## chatRWKV
rwkvAPI.py 
模型默认位置：RWKV-4-Pile-7B-EngChn-testNovel-2119-ctx2048-20230313.pth
## chatYuan
YuanAPI.py
模型默认位置：ChatYuan-large-v2
## TODO
### 1.详细说明和教程
### 2.chatRWKV历史对话支持(已支持，但所有用户共享state不能独立，未完待续）
### 3.chatYuan在线参数调整支持

