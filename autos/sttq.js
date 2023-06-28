// ==UserScript==
// @name         实体提取
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
func.push({
    name: "实体提取",
    question: async () => {
        let Q = app.question
        app.chat = [{ "role": "user", "content": "提取下列语句中的关键词，并用json返回：科普之路是不是任重而道远？" },
        { "role": "AI", "content": '["科普","道路","任重","道远"]' }]

        lsdh(true)//打开历史对话
        resp = await send("提取下列语句中的关键词：" + Q)
       

    },
})