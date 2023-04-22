// ==UserScript==
// @name         闻达 Auto ：知识库增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过分次输入知识库查找条目，帮助模型提高注意力，再提炼各次回答给出最终回答，起到更准确的查询效果
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

功能.push({
    名称: "知识库st增强-glm",
    问题: async () => {
        let Q = app.问题
        zsk(false)
        lsdh(true)//打开历史对话
        lsdh(false)
        app.对话.push({ "role": "user", "content": "ST知识库增强查找：" + Q })
        kownladge = await find(Q, 2)
        app.对话.push({ "role": "AI", "content": "识别结果" + JSON.stringify(kownladge) })
        result = []
        for (let i in kownladge) {
            if(i>3)continue
            let prompt = "精炼地总结以下文段中与问题相关的信息为二十个字。\n" +
            kownladge[i].content + "\n问题：" + Q
            result.push(await send(prompt))
        }
        let prompt = "学习以下文段,用中文回答问题。如果无法从中得到答案，忽略文段内容并用中文回答问题。\n" +
            result.join('\n') + "\n问题：" + Q
        await send(prompt)
        //app.会话模式={名称: "常规模式",描述: "输入问题",问题: ""}
    },
})
