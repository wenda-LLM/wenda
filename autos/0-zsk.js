// ==UserScript==
// @name         知识库
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  利用知识库回答问题
// @author       lyyyyy,pengber
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
//辅助函数
//在pdf和txt文件名中存储链接,形如title&http~!!www.baidu.com&.pdf格式,~是因为windows文件名不能有:,!是因为linux文件名不能有/
//返回http://www.baidu.com
get_link_form_name= (s) => {
    try {
        if(s.includes("&")) {
            replace_symbol = "!"        //因为linux文件名不能有/,而连接有/, 所以需要在文件名存储的时候把/替换成!,在前端显示的时候替换回来
            raw_title = s.match('\\[(.+)\\]')[1]
            raw_link = raw_title.match('\\&(.+)\\&') == null ? null: raw_title.match('\\&(.+)\\&')[1]
            real_link = raw_link.replace(/!/g,"/").replace(/~/g,":")
            return real_link
        }else{
            return null
        }
    } catch {
        return s
    }
}
//返回文件名
//title.txt格式和title&link&.txt格式, 都返回title.txt
get_title_form_md = (s) => {
    try {
        
        if(!s.includes("&")){
            return s.match('\\[(.+)\\]')[1]
        }else{
            str_list = s.match('\\[(.+)\\]')[1].split("&")
            title = str_list[0] + str_list[str_list.length-1]
            return title
        }
    } catch {
        return s
    }
}
//
//返回路径
//如果形如title&http~!!www.baidu.com&.pdf,则返回链接使得前端点击可以跳转
//如果形如title.pdf, 则返回/txt/title.pdf
get_url_form_md = (s) => {
    try {
        link = get_link_form_name(s)
        if(link == null) {
            return s.match('\\((.+)\\)')[1]
        }else{
            return link
        }
        
    } catch {
        return s
    }
}
window.answer_with_zsk = async (Q) => {
    // lsdh(false)
    app.top_p=0.2
    app.chat.push({ "role": "user", "content": Q })
    kownladge = (await find(Q, 5)).filter(i => !i.score || i.score < 120).map(i => ({
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
}
func.push({
    name: "知识库",
    description: "通过知识库回答问题",
    question: async (Q) => {
        answer_with_zsk(Q)
    }
})
window.answer_with_fast_zsk = async (Q) => {
    // lsdh(false)
    app.top_p=0.2
    kownladge = (await find(Q, app.zsk_step)).filter(i => !i.score || i.score < 120).map(i => ({
        title: get_title_form_md(i.title),
        url: get_url_form_md(i.title),
        content: i.content
    }))
    if (kownladge.length > 0) {
        if (app.llm_type == "rwkv") {
            let prompt = 'raw!Instruction: 深刻理解下面提供的信息，根据信息完成问答。\n\nInput: ' +
                kownladge.map((e, i) => i + 1 + "." + e.content).join('\n') + "\n\nResponse: Question: " + Q+"\nAnswer: "
            return await send(prompt, keyword = Q, show = true, sources = kownladge)
        } else {

            let prompt = app.zsk_answer_prompt + '\n' +
                kownladge.map((e, i) => i + 1 + "." + e.content).join('\n') + "\n问题：" + Q
            return await send(prompt, keyword = Q, show = true, sources = kownladge)
        }
    } else {
        app.chat.pop()
        sources = [{
            title: '未匹配到知识库',
            content: '本次对话内容完全由模型提供'
        }]
        return await send(Q, keyword = Q, show = true, sources = sources)
    }
}
func.push({
    name: "快速知识库",
    question: window.answer_with_fast_zsk
}
)
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
