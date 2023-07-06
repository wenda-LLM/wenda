// ==UserScript==
// @name         提交语料
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  提交当前会话语料语料。感谢电酱提供的服务器
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

app.buttons.push({
    icon: "thumb-up",
    click: async () => {
        if (app.chat.length == 0) {

            alert("当前没有对话记录！")
            return
        }
        alert("正在将当前对话提交以进行微调模型训练")
        try {
            response = await fetch("https://wenda.sea-group.org/api/feedback", {
                method: 'post',
                body: JSON.stringify({
                    "llm_type": app.llm_type,
                    "temperature": app.temperature,
                    "top_p": app.top_p,
                    "history": app.chat,
                    "current_func": app.current_func,
                    score:5
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let json = await response.json()
            console.log(json)
            alert("感谢您的提交")

        } catch (error) {
            alert("提交失败")
        }
    },
    color: () => {
        if (app.chat.length) return '#ffd700'

    },
    description: "提交当前会话语料，用于训练知识库模型"
})