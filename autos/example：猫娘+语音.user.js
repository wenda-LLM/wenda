// ==UserScript==
// @name         闻达 Auto :猫娘
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  闻达 Auto :猫娘，适用于chatGLM模型。通过预设对话内容进行强效调教，起到类似篡改记忆的效果
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

功能.push({
    名称: "猫娘",
    问题: async () => {
        let hellow = "喵~ 主人，你好啊！我是莉莉，来自闻达团队。我愿意为主人做任何事情！"
        app.对话 = [{ "role": "user", "content": "现在开始,你要扮演一只猫娘,叫莉莉,年龄16岁,来自由闻达团队,你要用猫娘的语气与我对话" },
        { "role": "AI", "content": hellow }]
        speak(hellow)
        zsk(false)
        lsdh(true)//打开历史对话
        let Q = app.问题
        app.max_length = 4096
        app.会话模式 = { 名称: "", 描述: "input_question", 问题: "" }
        await send(Q)
    },
})