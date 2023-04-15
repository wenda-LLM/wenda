// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

功能.push({
    名称: "写论文-rwkv",
    描述: "根据主题撰写内容翔实、有信服力的论文",
    问题: async () => {
        app.对话=[]//清除历史对话
        zsk(true)//打开知识库
        lsdh(true)//打开历史对话
        let Q = app.问题
        app.max_length = 40960
        resp = await send("根据以下主题，写一篇论文，包含摘要、提纲、正文：" +
                          Q,Q)
        zsk(false)//关闭知识库
        while (1) {
            await send("继续")
        }
    },
})