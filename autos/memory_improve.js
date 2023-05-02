// ==UserScript==
// @name         闻达 Auto ：记忆增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
genID = () => 'xxxxxxxxxxxx'.replace(/x/g, function () {
    return chars[Math.random() * 62 | 0]
})
if (!localStorage['wenda_rtst_ID']) localStorage['wenda_rtst_ID'] = genID()
功能.push({
    名称: "记忆增强",
    问题: async () => {
        Q = app.问题
        memory = await find_memory(Q)
        if (memory.length > 0) {
            A = await send(app.问题 + "（回忆起了以下内容）\n" + memory.map(i => i.content).join('\n'))
        } else {
            A = await send(app.问题)
        }
        add_memory("Bob: " + Q + "。\n Alice: " + A)
    },
})
find_memory = async (s) => {
    response = await fetch("/api/find_rtst_in_memory", {
        method: 'post',
        body: JSON.stringify({
            prompt: s,
            step: 3,
            memory_name: localStorage['wenda_rtst_ID']
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await response.json()
    console.table(json)
    return json
}
add_memory = async (txt) => {
    response = await fetch("/api/upload_rtst_zhishiku", {
        method: 'post',
        body: JSON.stringify({
            title: "聊天记忆" + Date.now(),
            txt: txt,
            memory_name: localStorage['wenda_rtst_ID']
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}