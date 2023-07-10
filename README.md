# 闻达：一个大规模语言模型调用平台
本项目设计目标为实现针对特定环境的高效内容生成，同时考虑个人和中小企业的计算资源局限性，以及知识安全和私密性问题。为达目标，平台化集成了以下能力：

1. 知识库：支持对接[本地离线向量库](#rtst模式)、[本地搜索引擎](#fess模式)、在线搜索引擎等。
2. 多种大语言模型：目前支持离线部署模型有`chatGLM-6B\chatGLM2-6B`、`chatRWKV`、`llama系列(不推荐中文用户)`、`moss(不推荐)`、`baichuan(需配合lora使用，否则效果差)`、`Aquila-7B`、`InternLM`，在线API访问`openai api`和`chatGLM-130b api`。
3. Auto脚本：通过开发插件形式的JavaScript脚本，为平台附件功能，实现包括但不限于自定义对话流程、访问外部API、在线切换LoRA模型。
4. 其他实用化所需能力：对话历史管理、内网部署、多用户同时使用等。


交流QQ群：LLM使用和综合讨论群`162451840`；知识库使用讨论群`241773574(已满，请去QQ频道讨论)`；Auto开发交流群`744842245`；[QQ频道](https://pd.qq.com/s/ej03plxks)

<!--ts-->
- [闻达：一个大规模语言模型调用平台](#闻达一个大规模语言模型调用平台)
  - [安装部署](#安装部署)
    - [各模型功能说明](#各模型功能说明)
    - [懒人包](#懒人包)
      - [百度云](#百度云)
      - [夸克](#夸克)
      - [介绍](#介绍)
    - [自行安装](#自行安装)
      - [1.安装库](#1安装库)
      - [2.下载模型](#2下载模型)
      - [3.参数设置](#3参数设置)
  - [Auto](#auto)
    - [Auto 开发函数列表](#auto-开发函数列表)
    - [Auto 开发涉及代码段](#auto-开发涉及代码段)
    - [部分内置 Auto 使用说明](#部分内置-auto-使用说明)
  - [知识库](#知识库)
    - [rtst模式](#rtst模式)
    - [使用微调模型提高知识库回答准确性](#使用微调模型提高知识库回答准确性)
      - [模型](#模型)
    - [fess模式](#fess模式)
    - [知识库调试](#知识库调试)
    - [清洗知识库文件](#清洗知识库文件)
  - [模型配置](#模型配置)
    - [chatGLM-6B/chatGLM2-6B](#chatglm-6bchatglm2-6b)
    - [chatRWKV](#chatrwkv)
      - [torch](#torch)
      - [cpp](#cpp)
    - [Aquila-7B](#aquila-7b)
- [基于本项目的二次开发](#基于本项目的二次开发)
  - [wenda-webui](#wenda-webui)
  - [接入Word文档软件](#接入word文档软件)

<!-- Created by https://github.com/ekalinin/github-markdown-toc -->
<!-- Added by: runner, at: Sun May 14 12:45:00 UTC 2023 -->

<!--te-->
![](imgs/setting.png)
![](imgs/setting2.png)
## 安装部署
### 各模型功能说明
| 功能                                             | 多用户并行 | 流式输出   | CPU            | GPU | 量化               | 外挂LoRa |
| ------------------------------------------------ | ---------- | ---------- | -------------- | --- | ------------------ | -------- |
| [chatGLM-6B/chatGLM2-6B](#chatglm-6bchatglm2-6b) | √          | √          | 需安装编译器   | √   | 预先量化和在线量化 | √        |
| RWKV [torch](#torch)                             | √          | √          | √              | √   | 预先量化和在线量化 |          |
| RWKV.[cpp](#cpp)                                 | √          | √          | 可用指令集加速 |     | 预先量化           |          |
| Baichuan-7B                                      | √          | √          | √              | √   |                    | √        |
| Baichuan-7B (GPTQ)                               | √          | √          |                | √   | 预先量化           |          |
| [Aquila-7B](#aquila-7b)                          |            | 官方未实现 | √              | √   |                    |          |
| replit                                           |            |            | √              | √   |                    |          |
| chatglm130b api                                  | √          |            |                |     |                    |          |
| openai api                                       | √          | √          |                |     |                    |          |
| llama.cpp                                        | √          | √          | 可用指令集加速 |     | 预先量化           |          |
| llama torch                                      | √          | √          | √              | √   | 预先量化和在线量化 |          |
| InternLM                                         | √          | √          | √              | √   | 在线量化           |          |
### 懒人包
#### 百度云
https://pan.baidu.com/s/1idvot-XhEvLLKCbjDQuhyg?pwd=wdai 

#### 夸克
链接：https://pan.quark.cn/s/c4cb08de666e
提取码：4b4R
#### 介绍
默认参数在6G显存设备上运行良好。最新版懒人版已集成一键更新功能，建议使用前更新。

使用步骤（以glm6b模型为例）：
1. 下载懒人版主体和模型，模型可以用内置脚本从HF下载，也可以从网盘下载。
2. 如果没有安装`CUDA11.8`，从网盘下载并安装。
3. 双击运行`运行GLM6B.bat`。
4. 如果需要生成离线知识库，参考 [知识库](#知识库)。
### 自行安装
PS:一定要看[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml)，里面对各功能有更详细的说明！！！
#### 1.安装库
通用依赖：```pip install -r requirements.txt```
根据使用的 [知识库](#知识库)进行相应配置

#### 2.下载模型
根据需要，下载对应模型。

建议使用chatRWKV的RWKV-4-Raven-7B-v11，或chatGLM-6B。

#### 3.参数设置
把[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml)重命名为`config.yml`，根据里面的参数说明，填写你的模型下载位置等信息

## Auto
auto功能通过JavaScript脚本实现，使用油猴脚本或直接放到`autos`目录的方式注入至程序，为闻达附加各种自动化功能。

### Auto 开发函数列表
| 函数 （皆为异步调用）           | 功能                                  | 说明                                                                |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| send(s,keyword = "",show=true)  | 发送信息至LLM，返回字符串为模型返回值 | s：输入模型文本；keyword:聊天界面显示文本；show：是否在聊天界面显示 |
| add_conversation(role, content) | 添加会话信息                          | role：'AI'、'user'；content：字符串                                 |
| save_history()                  | 保存会话历史                          | 对话完成后会自动保存，但手动添加的对话须手动保存                    |
| find(s, step = 1)               | 从知识库查找                          | 返回json数组                                                        |
| find_dynamic(s,step=1,paraJson) | 从动态知识库查找；参考闻达笔记Auto    | paraJson：{libraryStategy:"sogowx:3",maxItmes:2}                    |
| zsk(b=true)                     | 开关知识库                            |                                                                     |
| lsdh(b=true)                    | 开关历史对话                          | 打开知识库时应关闭历史                                              |
| speak(s)                        | 使用TTS引擎朗读文本。                 | 调用系统引擎                                                        |
| copy(s)                         | 使用浏览器`clipboard-write`复制文本   | 需要相关权限                                                        |
### Auto 开发涉及代码段
在左侧功能栏添加内容：
```
func.push({
    name: "名称",
    question: async () => {
        let answer=await send(app.question)
        alert(answer)
    },
})
```
在下方选项卡添加内容：
```
app.plugins.push({ icon: 'note-edit-outline', url: "/static/wdnote/index.html" })
```
在指定RTST知识库查找:
```
find_in_memory = async (s, step, memory_name) => {
   response = await fetch("/api/find_rtst_in_memory", {
      method: 'post',
      body: JSON.stringify({
         prompt: s,
         step: step,
         memory_name: memory_name
      }),
      headers: {
         'Content-Type': 'application/json'
      }
   })
   let json = await response.json()
   console.table(json)
   app.zhishiku = json
   return json
}
```
上传至指定RTST知识库:
```
upload_rtst_zhishiku = async (title, txt,memory_name) => {
   response = await fetch("/api/upload_rtst_zhishiku", {
      method: 'post',
      body: JSON.stringify({
         title: title,
         txt: txt,
         memory_name: memory_name
      }),
      headers: { 'Content-Type': 'application/json' }
   })
   alert(await response.text())
}
```
保存指定RTST知识库:
```
save_rtst = async (memory_name) => {
   response = await fetch("/api/save_rtst_zhishiku", {
      method: 'post',
      body: JSON.stringify({
         memory_name: memory_name
      }),
      headers: { 'Content-Type': 'application/json' }
   })
   alert(await response.text())
}
```
访问SD_agent:
```
response = await fetch("/api/sd_agent", {
   method: 'post',
   body: JSON.stringify({
         prompt: `((masterpiece, best quality)), photorealistic,` + Q,
         steps: 20,
         // sampler_name: "DPM++ SDE Karras",
         negative_prompt: `paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans`
   }),
   headers: {
         'Content-Type': 'application/json'
   }
})
try {
   let json = await response.json()
   add_conversation("AI", '![](data:image/png;base64,' + json.images[0] + ")")
} catch (error) {
   alert("连接SD API失败，请确认已开启agents库，并将SD API地址设置为127.0.0.1:786")
}
```
### 部分内置 Auto 使用说明
| 文件名               | 功能                                                                                |
| -------------------- | ----------------------------------------------------------------------------------- |
| 0-write_article.js   | 写论文：根据题目或提纲写论文                                                        |
| 0-zsk.js             | 知识库增强和管理                                                                    |
| face-recognition.js  | 纯浏览器端人脸检测：通过识别嘴巴开合，控制语音输入。因浏览器限制，仅本地或TLS下可用 |
| QQ.js                | QQ机器人:配置过程见文件开头注释                                                     |
| block_programming.js | 猫猫也会的图块化编程:通过拖动图块实现简单Auto功能                                   |
| 1-draw_use_SD_api.js | 通过agents模块（见example.config.yml`<Library>`）调用Stable Diffusion接口绘图       |

以上功能主要用于展示auto用法，进一步能力有待广大用户进一步发掘。
![](imgs/auto1.jpg)
![](imgs/auto2.png)
![](imgs/auto3.png)
![](imgs/auto4.png)

[auto例程](https://github.com/l15y/wenda/tree/main/autos)

## 知识库
知识库原理是在搜索后，生成一些提示信息插入到对话里面，知识库的数据就被模型知道了。[rtst模式](#rtst模式)计算语义并在本地数据库中匹配；[fess模式](#fess模式)（相当于本地搜索引擎）、bing模式均调用搜索引擎搜索获取答案。

为防止爆显存和受限于模型理解能力，插入的数据不能太长，所以有字数和条数限制，这一问题可通过知识库增强Auto解决。

正常使用中，勾选右上角知识库即开启知识库。
![](imgs/zsk1.jpg)
![](imgs/zsk2.png)



有以下几种方案：
1.   rtst模式，sentence_transformers+faiss进行索引，支持预先构建索引和运行中构建。
2.   bing模式，cn.bing搜索，仅国内可用
3.   bingsite模式，cn.bing站内搜索，仅国内可用
4.   fess模式，本地部署的[fess搜索](https://github.com/codelibs/fess)，并进行关键词提取
### rtst模式
sentence_transformers+faiss进行索引、匹配，并连同上下文返回。目前支持txt和pdf格式。

支持预先构建索引和运行中构建，其中，预先构建索引强制使用`cuda`，运行中构建根据`config.yml`(复制[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml))中`rtst`段的`device(embedding运行设备)`决定，对于显存小于12G的用户建议使用`CPU`。

Windows预先构建索引运行：`plugins/buils_rtst_default_index.bat`。

Linux直接使用wenda环境执行 `python plugins/gen_data_st.py`

需下载模型置于model文件夹，并将txt格式语料置于txt文件夹。
### 使用微调模型提高知识库回答准确性
闻达用户“帛凡”，训练并提供的权重合并模型和lora权重文件，详细信息见https://huggingface.co/fb700/chatglm-fitness-RLHF，使用该模型或者lora权重文件，对比hatglm-6b、chatglm2-6b、百川等模型，在闻达知识库平台中，总结能力可获得显著提升。
#### 模型
1. [GanymedeNil/text2vec-large-chinese](https://huggingface.co/GanymedeNil/text2vec-large-chinese) 不再推荐，不支持英文且显存占用高
2. [moka-ai/m3e-base](https://huggingface.co/moka-ai/m3e-base) 推荐
### fess模式
在本机使用默认端口安装fess后可直接运行。否则需修改`config.yml`(复制[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml))中`fess_host`的`127.0.0.1:8080`为相应值。[FESS安装教程](install_fess.md)
###  知识库调试
![](imgs/zsk-test.png)
![](imgs/zsk-glm.png)
![](imgs/zsk-rwkv.png)

### 清洗知识库文件

安装 [utool](https://u.tools/) 工具，uTools 是一个极简、插件化的桌面软件，可以安装各种使用 nodejs 开发的插件。您可以使用插件对闻达的知识库进行数据清洗。请自行安装以下推荐插件：

- 插件“解散文件夹”，用于将子目录的文件移动到根目录，并删除所有子目录。
- 插件“重复文件查找”，用于删除目录中的重复文件，原理是对比文件 md5。
- 插件“文件批量重命名”，用于使用正则匹配和修改文件名，并将分类后的文件名进行知识库的分区操作。

##  模型配置
### chatGLM-6B/chatGLM2-6B
运行：`run_GLM6B.bat`。

模型位置等参数：修改`config.yml`(复制[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml))。

默认参数在GTX1660Ti（6G显存）上运行良好。

### chatRWKV
支持torch和cpp两种后端实现，运行：`run_rwkv.bat`。

模型位置等参数：见`config.yml`(复制[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml))。
#### torch
可使用内置脚本对模型量化，运行：`cov_torch_rwkv.bat`。此操作可以加快启动速度。

在安装vc后支持一键启动CUDA加速，运行：`run_rwkv_with_vc.bat`。强烈建议安装！！！
#### cpp
可使用内置脚本对torch版模型转换和量化。 运行：`cov_ggml_rwkv.bat`。

设置strategy诸如"Q8_0->8"即支持量化在cpu运行，速度较慢，没有显卡或者没有nvidia显卡的用户使用。

注意：默认windows版本文件为AVX2，默认Liunx版本文件是在debian sid编译的，其他linux发行版本未知。

可以查看：[saharNooby/rwkv.cpp](https://github.com/saharNooby/rwkv.cpp)，下载其他版本，或者自行编译。

### Aquila-7B
1. 运行`pip install FlagAI`。注意FlagAI依赖很多旧版本的包，需要自己编译，所以如果想基于python3.11运行或者想在一个环境同时跑其他模型，建议去下懒人包
2. 运行：`run_Aquila.bat`。

模型位置等参数：见`config.yml`(复制[example.config.yml](https://github.com/l15y/wenda/blob/main/example.config.yml))。注意模型要在这里下：https://model.baai.ac.cn/model-detail/100101

# 基于本项目的二次开发
## [wenda-webui](https://github.com/AlanLee1996/wenda-webui)
项目调用闻达的 api 接口实现类似于 new bing 的功能。 技术栈：vue3 + element-plus + ts
![](imgs/webui.jpg)
## [接入Word文档软件](https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=20s7Vs0iZMx&contentID=1mlnYv&businessType=2&from=181174&shareSource=5&biz=ka)
通过宏，调用闻达HTTP API
![](imgs/Word.png)
[![Star History Chart](https://api.star-history.com/svg?repos=l15y/wenda&type=Date)](https://star-history.com/#l15y/wenda&Date)
