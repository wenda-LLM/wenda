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
                        await add_rtst_memory(yt, yt2prompt_dict[yt][prompt],"_ytsb")
                    }
                }
                alert("初始化完成")
            }
        }, {
            title: '删除意图向量库',
            content: '本功能用于测试',
            click: async () => {
                await del_rtst_memory("_ytsb")
                alert("删除完成")
            }
        }
        ],
            true
        )

    },
    color: () => app.color,
    description: "意图识别"
})
func.push({
    name: "意图识别",
    question: async () => {
        Q = app.question
        memory = await find_rtst_memory(Q,"_ytsb")
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