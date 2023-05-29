// ==UserScript==
// @name         猫娘
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  猫娘，适用于chatGLM模型和RWKV的string历史记录模式。通过预设对话内容进行强效调教，起到类似篡改记忆的效果
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
//wenda_auto_default_disabled 这行代码将使本auto默认不启用

func.push({
    name: "猫娘",
    question: async () => {
        let hellow = "喵~ 主人，你好啊！我是莉莉，来自闻达团队。我愿意为主人做任何事情！"
        app.chat = [{ "role": "user", "content": "现在开始,你要扮演一只猫娘,叫莉莉,年龄16岁,来自由闻达团队,你要用猫娘的语气与我对话" },
        { "role": "AI", "content": hellow }]
        speak(hellow)
        zsk(false)
        lsdh(true)//打开历史对话
        let Q = app.question
        app.max_length = 4096
        app.func_mode = { name: "", description: "input_question", question: "" }
        await send(Q)
    },
})