// ==UserScript==
// @name         闻达 Auto 示例：知识库增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  先根据不同关键词搜索结果给出粗略回答，再提炼各次回答给出最终回答
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

功能.push({
    名称: "知识库step",
    问题: async () => {
        let Q = app.问题
        app.对话.push({ "role": "user", "content": "步数为0" })
        kownladge = await find(Q, 0)
        kownladge=kownladge.map(i => i.content).join('\n\n').replace(/'/g,"")
        app.对话.push({ "role": "AI", "content": kownladge })
        app.对话.push({ "role": "user", "content": "步数为1" })
        kownladge = await find(Q, 1)
        kownladge=kownladge.map(i => i.content).join('\n\n').replace(/'/g,"")
        app.对话.push({ "role": "AI", "content": kownladge })
        app.对话.push({ "role": "user", "content": "步数为2" })
        kownladge = await find(Q, 2)
        kownladge=kownladge.map(i => i.content).join('\n\n').replace(/'/g,"")
        app.对话.push({ "role": "AI", "content": kownladge })
    },
})
