# 闻达：一个大规模语言模型调用平台
## 简介
一个LLM调用平台。旨在通过使用为小模型外挂知识库查找的方式，实现近似于大模型的生成能力。
1. 目前支持模型：`chatGLM-6B`、`chatRWKV`、`chatYuan`、`llama系列`。
2. 知识库扩展模型能力
3. 支持参数在线调整
4. 支持`chatGLM-6B`、`chatRWKV`、`llama系列`流式输出和输出过程中中断
5. 自动保存对话历史至浏览器（多用户同时使用不会冲突，`chatRWKV`历史消息实现方式需使用string）
6. 对话历史管理（删除单条、清空）
7. 支持局域网、内网部署和多用户同时使用。
8. 多用户同时使用中会自动排队，并显示当前用户。

**欢迎同学们制作教学视频、懒人包等，做好请和我联系，我会把相关链接加到readme里**

**交流QQ群：162451840（已满）；241773574**
##  截图
#### 设置和预设功能
![](imgs/setting.png)
![](imgs/setting2.png)

## 懒人包
链接：https://pan.baidu.com/s/105nOsldGt5mEPoT2np1ZoA?pwd=lyqz 

视频教程：https://www.bilibili.com/video/BV1aX4y1z7ar/?vd_source=629edb00375d46ad4097acdc7cbc0ca3

提取码：lyqz

默认参数在GTX1660Ti（6G显存）上运行良好。
1. 旧版包含程序主体和chatGLM-6B、chatYuan，分别是独立的压缩文件。
2. chatRWKV模型更新频繁，请去官方链接下最新的。暂不支持chatPDF功能，很快就加上。
3. 新版暂时只有chatGLM-6B，但重新制作，体积更新，包含各种优化，集成知识库功能，推荐使用。
## 自行安装
### 1.安装库
通用依赖：```pip install -r requirements.txt```
知识库bing模式：```pip install -r requirements-bing.txt```
知识库fess模式：```pip install -r requirements-fess.txt```
知识库sentence_transformers模式：```pip install -r requirements-st.txt```

### 2.下载模型
根据需要，下载对应模型。

建议使用chatRWKV的RWKV-4-Raven-7B-v7-ChnEng-20230404-ctx2048（截止4月6日效果较好），或chatGLM-6B。

### 3.参数设置
根据`config.xml`中说明，填写你的模型下载位置等信息
## 知识库
知识库原理是生成一些提示信息，会插入到对话里面。

fess模式、bing模式、bingxs模式、 bingsite模式均调用搜索引擎搜索获取答案。

搜索后在回答之前插入提示信息，知识库的数据就被模型知道了。

为防止爆显存，插入的数据不能太长，所以有字数限制。

知识库在线模式：```pip install -r requirements-bing.txt```

是有以下几种方案：
1.   bing模式，cn.bing搜索，仅国内可用
2.   bingxs模式，cn.bing学术搜索，仅国内可用
3.   bingsite模式，bing站内搜索，需设置网址
4.   st模式，sentence_transformers+faiss进行索引、匹配，并连同上下文返回，相当于原先x模式升级版。
构建索引运行：plugins/buils_ST_data.bat。
Linux直接使用wenda环境执行```python plugins/gen_data_st.py```
需下载模型[GanymedeNil/text2vec-large-chinese](https://huggingface.co/GanymedeNil/text2vec-large-chinese)置于model文件夹，并将txt格式语料置于txt文件夹。
TODO：在线语料上传、根据字数灵活提供上下文、根据上下文相关性提供上下文。
6.   mix模式，融合
7.   fess模式，本地部署的[fess搜索](https://github.com/codelibs/fess)，效果好于已删除的s、x模式，并使用[letiantian/TextRank4ZH](https://github.com/letiantian/TextRank4ZH)进行了关键词提取
### win系统fess使用
1. 懒人包中下载fess-14.7.0-with-jdk.7z
2. 解压到平时放软件的盘
3. 打开解压出来的fess-14.7.0-with-jdk\bin目录
4. 双击fess.in.bat
5. 双击fess.bat. 弹出命令行运行框. 将其最小化
6. 打开浏览器. 打开网址http://localhost:8080/
7. 点击右上角log in  输入账号:admin 密码：wenda 进行登录
8. 点击侧边栏中的Crawler. 点击File System
9. 点击右上角的Create New
10. Name输入便于记忆的资料库的名字
11. Paths输入资料库的地址（格式示例：file:///E:/pdf）
12. 其余选项保持默认. 下滚至最下方点击Create
13. 自动返回File System页面. 点击刚才创建的选项（自己输入的Name）
14. 点击Create new job. 点击Create
15. 进入侧边栏的System内的Scheduler. 可以看到很多任务
16. 目录的前面可以看到刚刚创建的job（示例：File Crawler - pdf search）. 点击进入
17. 点击Start now. 刷新界面即可看到该任务正在运行. running
18. 此时fess就在爬取文件的名字和内容. 可以在资源管理器看到cpu有负载
19. 挂机。等待爬取完成即可尝试搜索关键词

### linux系统fess使用
1. 安装JDK 
```
wget https://download.java.net/java/17/latest/jdk-17_linux-x64_bin.tar.gz
sudo tar xvf jdk-17_linux-x64_bin.tar.gz -C /usr/local/
```
解压后，JDK 17 将被安装在 /usr/local/jdk-17 目录中。

配置环境变量。要在系统中使用 JDK 17，您需要将其添加到 PATH 环境变量中。您可以使用以下命令将其添加到 /etc/profile 文件中：

```
 rm -f /etc/alternatives/java
 ln -s /usr/local/jdk-17.0.6/bin/java /etc/alternatives/java
     echo export JAVA_HOME=/usr/local/jdk-17.0.6 >>/etc/profile
     echo export PATH='$PATH':'$JAVA_HOME'/bin >>/etc/profile
     echo export CLASSPATH=.:'$JAVA_HOME'/lib/dt.jar:'$JAVA_HOME'/lib/tools.jar >>/etc/profile
     source /etc/profile
```
确认安装。您可以使用以下命令检查 JDK 17 是否已成功安装：
```
java -version
```
如果一切正常，您应该会看到类似以下内容的输出：

openjdk version "17.0.1" 2021-10-19
OpenJDK Runtime Environment (build 17.0.1+12-39)
OpenJDK 64-Bit Server VM (build 17.0.1+12-39, mixed mode, sharing)

2. 安装fess
下载fess
解压fess
```
unzip fess-14.7.0.zip
cd bin
 ./fess -d
```

####  调试工具
![](imgs/zsk-test.png)
####  chatGLM-6B模型
![](imgs/zsk-glm.png)

#### chatRWKV模型
![](imgs/zsk-rwkv.png)
### 使用
正常使用中，勾选右上角知识库
## chatGLM-6B
运行：`run_GLM6B.bat`。

模型位置等参数：修改`config.xml`。

默认参数在GTX1660Ti（6G显存）上运行良好。

## chatRWKV
运行：`run_rwkv.bat`。

模型位置等参数：修改`config.xml`。

默认参数在GTX1660Ti（6G显存）上正常运行，但速度较慢。

### 生成小说
![](imgs/novel.png)
#### 文字冒险游戏
![](imgs/wzmx.png)
## llama
运行：`run_llama.bat`。

注意库最好使用我修改的：[llama-cpp-python](https://github.com/l15y/llama-cpp-python)，才可以正常使用中文（截止4月15日）。

编译好的：https://github.com/l15y/llama-cpp-python/releases

模型位置等参数：修改`config.xml`。
## 闻达Auto
![](imgs/auto1.jpg)
![](imgs/auto2.jpg)
![](imgs/auto3.jpg)
[闻达auto增强知识库](https://github.com/l15y/wenda/tree/main/%E9%97%BB%E8%BE%BEauto%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC%E5%BD%A2%E5%BC%8F%E7%A4%BA%E4%BE%8B/知识库增强.js)
先根据不同关键词搜索结果给出粗略回答，再提炼各次回答给出最终回答

[闻达auto油猴脚本形式示例](https://github.com/l15y/wenda/tree/main/%E9%97%BB%E8%BE%BEauto%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC%E5%BD%A2%E5%BC%8F%E7%A4%BA%E4%BE%8B)

特别推荐：[rwkv写论文脚本升级版-作者：FIGHTZERO.user.js](https://github.com/l15y/wenda/blob/main/%E9%97%BB%E8%BE%BEauto%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC%E5%BD%A2%E5%BC%8F%E7%A4%BA%E4%BE%8B/rwkv%E5%86%99%E8%AE%BA%E6%96%87%E8%84%9A%E6%9C%AC%E5%8D%87%E7%BA%A7%E7%89%88-%E4%BD%9C%E8%80%85%EF%BC%9AFIGHTZERO.user.js)

结果展示：[rwkv写论文生成效果.txt](https://github.com/l15y/wenda/blob/main/%E9%97%BB%E8%BE%BEauto%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC%E5%BD%A2%E5%BC%8F%E7%A4%BA%E4%BE%8B/rwkv写论文生成效果.txt)
## 二次开发
兼容chatbox的api：http://127.0.0.1:17860/chat/completions
## TODO
实现以下知识库模组：
```
知识图谱
```
实现以下模型模组：
```
```
