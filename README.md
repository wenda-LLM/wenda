# 闻达：一个大规模语言模型调用平台
针对特定环境的内容生成是LLM使用中的一项重要应用，实现这一目的，主要有`全量微调`、`lora微调`、和本项目方法。但个人没有做全量微调的，lora微调只能牺牲基础能力换单任务效果（用6B模型lora调出来的单任务效果，专门设计一个0.5B模型也能实现，且推理成本更低）。

而本项目采用知识库+auto脚本的形式为LLM提高生成能力，充分考虑个人和中小企业的资源问题，以及国内大背景下知识安全和私密性问题,实现使小模型获得近似于大模型的生成能力。
1. 目前支持模型：`chatGLM-6B`、`chatRWKV`、`chatYuan`、`llama系列`以及`openaiapi`和`chatglm130b api`，初步支持`moss`。
2. 使用知识库扩展模型所知信息，使用auto提高模型生成质量和复杂问题解决能力
3. 支持`chatGLM-6B`、`chatRWKV`、`llama系列`流式输出和输出过程中中断
4. 自动保存对话历史至浏览器（多用户同时使用不会冲突，`chatRWKV`历史消息实现方式需使用string）
5. 对话历史管理（删除单条、清空）
6. 支持局域网、内网部署和多用户同时使用。


**交流QQ群：LLM使用和综合讨论群162451840；知识库使用讨论群241773574；Auto开发交流群744842245；[discussions](https://github.com/l15y/wenda/discussions)**

<!--ts-->
* [闻达：一个大规模语言模型调用平台](#闻达一个大规模语言模型调用平台)
   * [安装部署](#安装部署)
      * [懒人包](#懒人包)
      * [自行安装](#自行安装)
         * [1.安装库](#1安装库)
         * [2.下载模型](#2下载模型)
         * [3.参数设置](#3参数设置)
   * [Auto](#auto)
      * [部分内置Auto使用说明](#部分内置auto使用说明)
   * [知识库](#知识库)
      * [rtst模式](#rtst模式)
      * [fess模式](#fess模式)
      * [知识库调试](#知识库调试)
      * [使用](#使用)
   * [模型配置](#模型配置)
      * [chatGLM-6B](#chatglm-6b)
      * [chatRWKV](#chatrwkv)
         * [生成小说](#生成小说)
         * [文字冒险游戏](#文字冒险游戏)
      * [llama](#llama)
* [基于本项目的二次开发](#基于本项目的二次开发)
   * [<a href="https://github.com/AlanLee1996/wenda-webui">wenda-webui</a>](#wenda-webui)

<!-- Created by https://github.com/ekalinin/github-markdown-toc -->
<!-- Added by: runner, at: Sun May  7 11:04:27 UTC 2023 -->

<!--te-->
![](imgs/setting.png)
![](imgs/setting2.png)
## 安装部署
### 懒人包
链接：https://pan.baidu.com/s/105nOsldGt5mEPoT2np1ZoA?pwd=lyqz 

视频教程：https://www.bilibili.com/video/BV1aX4y1z7ar/?vd_source=629edb00375d46ad4097acdc7cbc0ca3

提取码：lyqz

默认参数在6G显存设备上运行良好。最新版懒人版已集成一键更新功能，建议使用前更新。

使用步骤（以glm6b模型为例）：
1. 下载懒人版主体（最新版已集成模型，因此不需单独下载）。
2. 如果没有安装`CUDA11.8`，从网盘下载并安装。
3. 双击运行`运行GLM6B.bat`。
4. 如果需要生成离线知识库，参考 [知识库](#知识库)。
### 自行安装
PS:一定要看`example.config.yml`，里面对各功能有更详细的说明！！！
#### 1.安装库
通用依赖：```pip install -r requirements.txt```
根据使用的 [知识库](#知识库)进行相应配置

#### 2.下载模型
根据需要，下载对应模型。

建议使用chatRWKV的RWKV-4-Raven-7B-v11，或chatGLM-6B。

#### 3.参数设置
把`example.config.yml`重命名为`config.yml`(复制`example.config.yml`)，根据里面的参数说明，填写你的模型下载位置等信息

## Auto
auto功能通过JavaScript脚本实现，使用油猴脚本或直接放到`autos`目录的方式注入至程序，为闻达附加各种自动化功能。

### 部分内置Auto使用说明
| 文件名               | 功能                                                                                |
| -------------------- | ----------------------------------------------------------------------------------- |
| 0-write_article.js   | 写论文：根据题目或提纲写论文                                                        |
| 0-zsk.js             | 知识库增强和管理                                                                    |
| face-recognition.js  | 纯浏览器端人脸检测：通过识别嘴巴开合，控制语音输入。因浏览器限制，仅本地或TLS下可用 |
| QQ.js                | QQ机器人:配置过程见文件开头注释                                                     |
| block_programming.js | 猫猫也会的图块化编程:通过拖动图块实现简单Auto功能                                   |
| 1-draw_use_SD_api.js | 通过agents模块（见example.config.yml`<Library>`）调用Stable Diffusion接口绘图          |

以上功能主要用于展示auto用法，进一步能力有待广大用户进一步发掘。
![](imgs/auto1.jpg)
![](imgs/auto2.png)
![](imgs/auto3.png)

[auto例程](https://github.com/l15y/wenda/tree/main/autos)

## 知识库
知识库原理是生成一些提示信息，会插入到对话里面。
![](imgs/zsk1.jpg)
![](imgs/zsk2.png)

fess模式、bing模式均调用搜索引擎搜索获取答案。

搜索后在回答之前插入提示信息，知识库的数据就被模型知道了。

为防止爆显存，插入的数据不能太长，所以有字数限制。

有以下几种方案：
1.   rtst模式，sentence_transformers+faiss进行索引，支持预先构建索引和运行中构建。
2.   bing模式，cn.bing搜索，仅国内可用
2.   bingsite模式，cn.bing站内搜索，仅国内可用
3.   fess模式，本地部署的[fess搜索](https://github.com/codelibs/fess)，并进行关键词提取
4.   mix模式，融合
### rtst模式
sentence_transformers+faiss进行索引、匹配，并连同上下文返回。目前支持txt和pdf格式。

支持预先构建索引和运行中构建，其中，预先构建索引强制使用`cuda`，运行中构建根据`config.yml`(复制`example.config.yml`)中`rtst`段的`device(embedding运行设备)`决定，对于显存小于12G的用户建议使用`CPU`。

Windows预先构建索引运行：`plugins/buils_rtst_default_index.bat`。

Linux直接使用wenda环境执行 `python plugins/gen_data_st.py`

需下载模型[GanymedeNil/text2vec-large-chinese](https://huggingface.co/GanymedeNil/text2vec-large-chinese)置于model文件夹，并将txt格式语料置于txt文件夹。


### fess模式
在本机使用默认端口安装fess后可直接运行。否则需修改`config.yml`(复制`example.config.yml`)中`fess_host`的`127.0.0.1:8080`为相应值。[FESS安装教程](install_fess.md)
###  知识库调试
![](imgs/zsk-test.png)
![](imgs/zsk-glm.png)

![](imgs/zsk-rwkv.png)
### 使用
正常使用中，勾选右上角知识库
##  模型配置
### chatGLM-6B
运行：`run_GLM6B.bat`。

模型位置等参数：修改`config.yml`(复制`example.config.yml`)。

默认参数在GTX1660Ti（6G显存）上运行良好。

### chatRWKV
运行：`run_rwkv.bat`。

模型位置等参数：见`config.yml`(复制`example.config.yml`)。

默认参数在GTX1660Ti（6G显存）上正常运行，但速度较慢。

设置strategy诸如"Q8_0->8"即支持量化在cpu运行，速度较慢，没有显卡或者没有nvidia显卡的用户使用。
注意默认librwkv.so是在debian sid编译的，其他linux发行版本未知。可以查看：[saharNooby/rwkv.cpp](https://github.com/saharNooby/rwkv.cpp)，下载windows版本，或者自行编译。
plugins/rwkvcpp里的三个模块来自[saharNooby/rwkv.cpp](https://github.com/saharNooby/rwkv.cpp)

#### 生成小说
![](imgs/novel.png)
#### 文字冒险游戏
![](imgs/wzmx.png)
### llama
运行：`run_llama.bat`。

模型位置等参数：见`config.yml`(复制`example.config.yml`)。

# 基于本项目的二次开发
## [wenda-webui](https://github.com/AlanLee1996/wenda-webui)
项目调用闻达的 api 接口实现类似于 new bing 的功能。 技术栈：vue3 + element-plus + ts

[![Star History Chart](https://api.star-history.com/svg?repos=l15y/wenda&type=Date)](https://star-history.com/#l15y/wenda&Date)
