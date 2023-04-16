// ==UserScript==
// @name         闻达 Auto 示例：知识库直读
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  闻达 Auto 示例
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

功能.push({
    名称: "知识库直读",
    问题: async () => {
        let Q = app.问题
        app.对话=[{"role":"user","content":"查询"+Q},
                {"role":"AI","content":JSON.stringify(await find(Q))}]
    },
})