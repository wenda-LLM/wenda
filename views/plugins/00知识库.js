// ==UserScript==
// @name         闻达 Auto 示例：知识库直读
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
    名称: "知识库直读",
    问题: async () => {
        let Q = app.问题
        app.对话 = [{ "role": "user", "content": "现在开始,你的任务是提取关键词，提取下列语句中的关键词，并用空格分隔：科普之路是不是任重而道远？" },
        { "role": "AI", "content": '科普 道路 任重 道远' }]
        zsk(false)
        lsdh(true)//打开历史对话
        resp = await send("提取下列语句中的关键词：" + Q)
        lsdh(false)
        resp = resp.replace(/关键词提取/g, '').replace(/[：，]/g, ' ').trim().split(' ')
        app.对话.push({ "role": "AI", "content": "识别结果" + JSON.stringify(resp) })
        result = []
        for (let i in resp) {
            app.对话.push({ "role": "AI", "content": "查询中：" + resp[i] })
            kownladge = await find(resp[i])
            // app.对话.push({ "role": "AI", "content": JSON.stringify(kownladge) })
            let prompt = "学习以下文段,总结其中与问题相关的内容。\n" +
                kownladge.map(i => i.content).join('\n') + "\n问题：" + Q
            result.push(await send(prompt))
        }
        let prompt = "学习以下文段,用中文回答问题。如果无法从中得到答案，忽略文段内容并用中文回答问题。\n" +
            result.join('\n') + "\n问题：" + Q
        await send(prompt)
        //app.会话模式={名称: "常规模式",描述: "输入问题",问题: ""}
    },
})