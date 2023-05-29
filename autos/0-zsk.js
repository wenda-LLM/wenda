// ==UserScript==
// @name         知识库
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  利用知识库回答问题
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
get_title_form_md = (s) => {
    console.log(s)
    try {
        return s.match('\\[(.+)\\]')[1]
    } catch {
        return s
    }
}
get_url_form_md = (s) => {
    console.log(s)
    try {
        return s.match('\\((.+)\\)')[1]
    } catch {
        return s
    }
}
func.push({
    name: "知识库",
    description: "通过知识库回答问题",
    question: async () => {
        let Q = app.question

        lsdh(false)
        app.chat.push({ "role": "user", "content": Q })
        kownladge = (await find(Q, 5)).map(i => ({
            title: get_title_form_md(i.title),
            url: get_url_form_md(i.title),
            content: i.content
        }))
        if (kownladge.length > 0) {
            answer = {
                role: "AI",
                content: "",
                sources: kownladge
            }
            app.chat.push(answer)
            result = []
            for (let i in kownladge) {
                answer.content = '正在查找：' + kownladge[i].title
                if (i > 3) continue
                let prompt = app.zsk_summarize_prompt + '\n' +
                    kownladge[i].content + "\n问题：" + Q
                result.push(await send(prompt, keyword = Q, show = false))
            }
            app.chat.pop()
            app.chat.pop()
            let prompt = app.zsk_answer_prompt + '\n' +
                result.join('\n') + "\n问题：" + Q
            return await send(prompt, keyword = Q, show = true, sources = kownladge)
        } else {
            app.chat.pop()
            sources = [{
                title: '未匹配到知识库',
                content: '本次对话内容完全由模型提供'
            }]
            return await send(Q, keyword = Q, show = true, sources = sources)
        }
    },
})

if (app.llm_type == "rwkv") {

    func.push({
        name: "知识库增强(rwkv)",
        question: async () => {
            let Q = app.question

            lsdh(false)
            kownladge = (await find(Q, 5)).map(i => ({
                title: get_title_form_md(i.title),
                url: get_url_form_md(i.title),
                content: i.content
            }))
            let prompt = "学习以下文段,用中文回答问题。如果无法从中得到答案，忽略文段内容并用中文回答问题。\n" +
                kownladge.map(i => i.content).join('\n') + "\n问题：" + Q
            await send(prompt, keyword = Q, show = true, sources = kownladge)
        }
    }
    )
    func.push({
        name: "知识库增强(根据关键词)",
        question: async () => {
            app.历史对话轮数限制 = 0
            let Q = app.question
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

            lsdh(true)//打开历史对话
            resp = await send("请提取关键词，使用逗号分隔。")
            lsdh(false)
            resp = resp.replace(/关键词提取/g, '').replace(/[：，]/g, ' ').trim().split(' ')
            app.chat.push({
                "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                    kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g, ' ') + "|").join("\n")
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
        
        },
    })
}
else if (app.llm_type == "glm6b") {
    func.push({
        name: "知识库增强(根据关键词)",
        question: async () => {
            let Q = app.question
            app.chat = [{ "role": "user", "content": "现在开始,你的任务是提取关键词，提取下列语句中的关键词，并用空格分隔：科普之路是不是任重而道远？" },
            { "role": "AI", "content": '科普 道路 任重 道远' }]

            lsdh(true)//打开历史对话
            resp = await send("提取下列语句中的关键词：" + Q)
            lsdh(false)
            resp = resp.replace(/关键词提取/g, '').replace(/[：，]/g, ' ').trim().split(' ')
            app.chat.push({
                "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                    kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g, ' ') + "|").join("\n")
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
       
        },
    })
}
func.push({
    name: "sgwx知识库全文爬取",
    question: async () => {
        let Q = app.question

        lsdh(true)//打开历史对话
        lsdh(false)
        app.chat.push({ "role": "user", "content": Q })
        kownladge = await find(Q, 2)
        app.chat.push({
            "role": "AI", "content": "识别结果:\n|标题|内容|\n|--|--|\n" +
                kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g, ' ') + "|").join("\n")
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
      
    },
})
// func.push({
//     name: "知识库step",
//     question: async () => {
//         let Q = app.question
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
