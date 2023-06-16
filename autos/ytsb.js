// ==UserScript==
// @name         意图识别
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
    icon: "multicast",
    click: async () => {

        app.chat = []
        app.current_func = '意图识别'
        add_conversation("AI", "欢迎使用意图识别，初次使用，请初始化意图向量库", [{
            title: '初始化意图向量库',
            content: '本功能只需执行一次',
            click: async () => {
                yt2prompt_dict = {
                    快速知识库: ['为什么', '我想问一下', '什么是'],
                    中文绘图: ['帮我画一张', '画一个'],
                    提问助手: ['请对会议内容提问', '对于上一个回答，你有那些疑问', '帮我提出几个有建设性的问题'],
                }
                for (yt in yt2prompt_dict) {
                    for (prompt in yt2prompt_dict[yt]) {
                        await add_memory_jyzq(yt, yt2prompt_dict[yt][prompt])
                    }
                }
                alert("完成")
            }
        }, {
            title: '删除意图向量库',
            content: '本功能用于测试',
            click: async () => {
                await del_memory_jyzq()
                alert("完成")
            }
        }
        ],
            true
        )

    },
    color: () => app.color,
    description: "意图识别"
})
chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
genID = () => 'xxxxxxxxxxxx'.replace(/x/g, function () {
    return chars[Math.random() * 62 | 0]
})
if (!localStorage['wenda_rtst_ID']) localStorage['wenda_rtst_ID'] = genID()
func.push({
    name: "意图识别",
    question: async () => {
        Q = app.question
        memory = await find_memory_jyzq(Q)
        if (memory.length > 0) {
            add_conversation("AI", '识别到意图为:' + memory[0].title + "，正在调用相应auto")
            // A = await send(app.question )
            let 当前_auot=app.func_menu.find((i) => i.name == memory[0].title)
            if (typeof 当前_auot.question == "function") {
                当前_auot.question();
            } else {
                let Q = app.question
                await send(当前_auot.question + Q, Q);
                app.question = ''
            }
            // app.func_menu.find((i) => i.name == memory[0].title).question(Q)
        } else {
            A = await send(app.question)
        }
        //+ " Alice: " + A
    },
})
find_memory_jyzq = async (s) => {
    response = await fetch("/api/find_rtst_in_memory", {
        method: 'post',
        body: JSON.stringify({
            prompt: s,
            step: 0,
            memory_name: localStorage['wenda_rtst_ID'] + "_ytsb"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await response.json()
    console.table(json)
    return json
}
add_memory_jyzq = async (title, txt) => {
    response = await fetch("/api/upload_rtst_zhishiku", {
        method: 'post',
        body: JSON.stringify({
            title: title,
            txt: txt,
            memory_name: localStorage['wenda_rtst_ID'] + "_ytsb"
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}
del_memory_jyzq = async () => {
    response = await fetch("/api/del_rtst_in_memory", {
        method: 'post',
        body: JSON.stringify({
            memory_name: localStorage['wenda_rtst_ID'] + "_ytsb"
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}