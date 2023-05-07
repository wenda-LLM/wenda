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
    名称: "知识库增强(sgwx全文爬取)",
    问题: async () => {
        let Q = app.问题
        zsk(false)
        lsdh(true)//打开历史对话
        lsdh(false)
        app.chat.push({ "role": "user", "content": Q })
        kownladge = await find(Q, 2)
        app.chat.push({
            "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g,' ') + "|").join("\n")
        })
        result = []
        for (let i in kownladge) {
            wx_response = await fetch("/api/read_sgwx", {
                method: 'post',
                body: JSON.stringify({
                    url: kownladge[i].title.match(/\((.+)\)/)[1],
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let prompt = "精炼地总结以下文段中与问题相关的信息为二十个字。\n" + await wx_response.text() + "\n问题：" + Q
            result.push(await send(prompt))
        }
        let prompt = "根据以下资料，用中文回答问题。\n" +
            result.join('\n') + "\n问题：" + Q
        await send(prompt)
        //app.会话模式={名称: "常规模式",描述: "输入问题",问题: ""}
    },
})
功能.push({
    名称: "知识库增强(根据注意力)",
    问题: async () => {
        let Q = app.问题
        zsk(false)
        lsdh(true)//打开历史对话
        lsdh(false)
        app.chat.push({ "role": "user", "content": "ST知识库增强查找：" + Q })
        kownladge = await find(Q, 2)
        app.chat.push({
            "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g,' ') + "|").join("\n")
        })
        result = []
        for (let i in kownladge) {
            if (i > 3) continue
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

if (app.llm_type == "rwkv") {
    功能.push({
        名称: "知识库增强(根据关键词)",
        问题: async () => {
            app.历史对话轮数限制 = 0
            let Q = app.问题
            app.chat = [{ "role": "AI", "content": '科普之路是不是任重而道远？' },
            { "role": "user", "content": "请提取关键词，使用逗号分隔。" },
            { "role": "AI", "content": '科普，道路，任重，道远' },
            { "role": "AI", "content": "退休后医疗保险年限不够，可以继续参保吗？" },
            { "role": "user", "content": "请提取关键词，使用逗号分隔。" },
            { "role": "AI", "content": '退休，医疗保险，年限，继续参保' },
            { "role": "AI", "content": "为什么我的电子社保卡参保地是错的？" },
            { "role": "user", "content": "请提取关键词，使用逗号分隔。" },
            { "role": "AI", "content": '电子社保卡，参保地，错误' },
            { "role": "AI", "content": Q }]
            zsk(false)
            lsdh(true)//打开历史对话
            resp = await send("请提取关键词，使用逗号分隔。")
            lsdh(false)
            resp = resp.replace(/关键词提取/g, '').replace(/[：，]/g, ' ').trim().split(' ')
            app.chat.push({
                "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                    kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g,' ') + "|").join("\n")
            })
            result = []
            for (let i in resp) {
                app.chat.push({ "role": "AI", "content": "查询中：" + resp[i] })
                kownladge = await find(resp[i], 1)
                // app.chat.push({ "role": "AI", "content": JSON.stringify(kownladge) })
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
}
else if (app.llm_type == "glm6b") {
    功能.push({
        名称: "知识库增强(根据关键词)",
        问题: async () => {
            let Q = app.问题
            app.chat = [{ "role": "user", "content": "现在开始,你的任务是提取关键词，提取下列语句中的关键词，并用空格分隔：科普之路是不是任重而道远？" },
            { "role": "AI", "content": '科普 道路 任重 道远' }]
            zsk(false)
            lsdh(true)//打开历史对话
            resp = await send("提取下列语句中的关键词：" + Q)
            lsdh(false)
            resp = resp.replace(/关键词提取/g, '').replace(/[：，]/g, ' ').trim().split(' ')
            app.chat.push({
                "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                    kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g,' ') + "|").join("\n")
            })
            result = []
            for (let i in resp) {
                app.chat.push({ "role": "AI", "content": "查询中：" + resp[i] })
                kownladge = await find(resp[i])
                // app.chat.push({ "role": "AI", "content": JSON.stringify(kownladge) })
                let prompt = "学习以下文段, 用中文回答用户问题。如果无法从中得到答案，忽略文段内容并用中文回答用户问题。\n" +
                    kownladge.map(i => i.content).join('\n') + "\n问题：" + Q
                result.push(await send(prompt))
            }
            let prompt = "学习以下文段, 用中文回答用户问题。如果无法从中得到答案，忽略文段内容并用中文回答用户问题。\n" +
                result.join('\n') + "\n问题：" + Q
            await send(prompt)
            //app.会话模式={名称: "常规模式",描述: "输入问题",问题: ""}
        },
    })
}
// 功能.push({
//     名称: "知识库step",
//     问题: async () => {
//         let Q = app.问题
//         app.chat.push({ "role": "user", "content": "步数为0" })
//         kownladge = await find(Q, 0)
//         kownladge=kownladge.map(i => i.content).join('\n\n').replace(/'/g,"")
//         app.chat.push({ "role": "AI", "content": kownladge })
//         app.chat.push({ "role": "user", "content": "步数为1" })
//         kownladge = await find(Q, 1)
//         kownladge=kownladge.map(i => i.content).join('\n\n').replace(/'/g,"")
//         app.chat.push({ "role": "AI", "content": kownladge })
//         app.chat.push({ "role": "user", "content": "步数为2" })
//         kownladge = await find(Q, 2)
//         kownladge=kownladge.map(i => i.content).join('\n\n').replace(/'/g,"")
//         app.chat.push({ "role": "AI", "content": kownladge })
//     },
// })
