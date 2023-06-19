// ==UserScript==
// @name         rtst_客服
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

app.buttons.push({
    icon: "face-agent",
    click: async () => {

        app.current_func = 'rtst_客服'
        add_conversation("AI", "欢迎使用rtst_客服。\n初次使用，请初始化客服向量库", [{
            title: '初始化意图向量库',
            content: '本功能只需执行一次',
            click: async () => {
                let 你好 = `你好，这里是闻达rtst客服。当前使用的LLM为“${app.llm_type}”"`
                yt2prompt_dict = {
                    "闻达是一个LLM调用平台。目标为针对特定环境的高效内容生成，同时考虑个人和中小企业的计算资源局限性，以及知识安全和私密性问题": ['什么是闻达'],
                    "闻达webui调用闻达的 api 接口实现类似于 new bing 的功能。\n技术栈：vue3 + element-plus + ts": ['什么是闻达webui'],
                }
                yt2prompt_dict[你好] = ['你好', '你是谁']
                for (yt in yt2prompt_dict) {
                    for (prompt in yt2prompt_dict[yt]) {
                        await add_memory_rtst_客服(yt, yt2prompt_dict[yt][prompt])
                    }
                }
                alert("完成")
            }
        }, {
            title: '删除意图向量库',
            content: '本功能用于测试',
            click: async () => {
                await del_memory_rtst_客服()
                alert("完成")
            }
        }
        ],
            true
        )

    },
    color: () => app.color,
    description: "rtst_客服"
})
chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
genID = () => 'xxxxxxxxxxxx'.replace(/x/g, function () {
    return chars[Math.random() * 62 | 0]
})
if (!localStorage['wenda_rtst_ID']) localStorage['wenda_rtst_ID'] = genID()
rtst_客服 = async (Q) => {
    memory = await find_memory_rtst_客服(Q)
    if (memory.length > 0) {
        add_conversation("user", Q)
        let answer = memory[0].title
        add_conversation("AI", answer, [{
            title: "匹配问题：" + memory[0].content,
            content: "相似度：" + memory[0].score
        }
        ])
        save_history()
        return answer

    } else {
        return await send(Q)
    }
    //+ " Alice: " + A
}
func.push({
    name: "rtst_客服",
    question: async (Q) => {
        return await rtst_客服(Q)
    }
})
find_memory_rtst_客服 = async (s) => {
    response = await fetch("/api/find_rtst_in_memory", {
        method: 'post',
        body: JSON.stringify({
            prompt: s,
            step: 0,
            memory_name: localStorage['wenda_rtst_ID'] + "_rtst_客服"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await response.json()
    console.table(json)
    return json
}
add_memory_rtst_客服 = async (title, txt) => {
    response = await fetch("/api/upload_rtst_zhishiku", {
        method: 'post',
        body: JSON.stringify({
            title: title,
            txt: txt,
            memory_name: localStorage['wenda_rtst_ID'] + "_rtst_客服"
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}
del_memory_rtst_客服 = async () => {
    response = await fetch("/api/del_rtst_in_memory", {
        method: 'post',
        body: JSON.stringify({
            memory_name: localStorage['wenda_rtst_ID'] + "_rtst_客服"
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}