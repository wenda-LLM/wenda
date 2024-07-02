// ==UserScript==
// @name         记忆增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  使用rtst知识库增强模型长期记忆能力
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

func.push({
    name: "记忆增强",
    question: async () => {
        Q = app.question
        memory = await find_rtst_memory(Q, 'jyzq')
        if (memory.length > 0) {
            A = await send(app.question + memory.map(i => `\n[在第${i.title}的回忆：${i.content}]`).join(''))
        } else {
            A = await send(app.question)
        }
        add_rtst_memory(记忆轮次+"轮", Q, 'jyzq')//+ " Alice: " + A
        记忆轮次 += 1
    },
})
记忆轮次 = 1