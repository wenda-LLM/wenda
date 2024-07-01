# 闻达纯前端版：一个大规模语言模型调用平台
这个分支的readme正在写
本项目设计目标为实现针对特定环境的高效内容生成，同时考虑个人和中小企业的计算资源局限性，以及知识安全和私密性问题。为达目标，平台化集成了以下能力：

1. 知识库。
2. 多种大语言模型。
3. Auto脚本：通过开发插件形式的JavaScript脚本，为平台附件功能，实现包括但不限于自定义对话流程、访问外部API、在线切换LoRA模型。
4. 其他实用化所需能力：对话历史管理、内网部署、多用户同时使用等。



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


[![Star History Chart](https://api.star-history.com/svg?repos=l15y/wenda&type=Date)](https://star-history.com/#l15y/wenda&Date)
