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
    名称: "写论文-glm",
    描述: "根据主题撰写内容翔实、有信服力的论文",
    问题: async () => {
        zsk(false)//关闭知识库
        lsdh(false)//关闭历史对话
        let Q = app.问题
        resp = await send("根据以下主题，写一篇论文提纲：" +
                          Q)
        app.max_length = 4096
        resps = resp.split("\n\n")
        for (i in resps) {
            await send("根据主题：" + Q +
                       "\n提纲：" + resp +
                       "\n对提纲中的下列段落进行撰写：" + resps[i])
        }
    },
})