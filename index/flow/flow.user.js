// ==UserScript==
// @name         闻达智能工作流增强
// @namespace    http://tampermonkey.net/
// @version      2024-07-09
// @description  try to take over the world!
// @author       lyyyy
// @match        http://127.0.0.1:65530/flow/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @connect      mp.weixin.qq.com

// @supportURL   https://github.com/wenda-LLM/wenda/tree/pure_frontend
// @homepageURL  https://github.com/wenda-LLM/wenda/tree/pure_frontend
// @downloadURL  http://127.0.0.1:65530/flow/flow.user.js
// @updateURL    http://127.0.0.1:65530/flow/flow.user.js
// ==/UserScript==

(function() {
    'use strict';
app.have_improver=true
app.read_html = async i => {
    let resData
    await new Promise(resolve => {
        GM_xmlhttpRequest({
            method: "get",
            url: i,
            data: '',
            headers:  {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function (res) {
                resData = res.responseText;
                console.log(resData,res)
                resolve()
            }
        });
    })
    let n = document.createElement('p')
    n.innerHTML = resData
    let content = n.querySelectorAll("section>p,section>span")
    let r = '';
    content.forEach(i => r += (i.innerText+"\n"))
    return r.replace(/[\r\n]+/g, '\n').replace(/^\n/, '').replace(/\n$/, '')
}
app.set_tooltip=s=> GM_notification({
            title: '自动流通知',
            text: s,
            highlight: true,
            silent: false,
            timeout: 0, // 延时关闭，如果希望显示直到交互设置为0
            oncreate: function(id) {
                notificationId = id; // 存储通知ID以便后续更新进度
            }
        });
app.nodes = app.nodes.concat([
    {
        name: '读取公众号',
        function: '[await app.read_html(a)]',
        node: "read_wxgzh",
        icon: "printer-outline",
        in: 1,
        out: 1,
        data: {},
        template: ``
    },
    {
        name: '浮窗文本',
        function: 'app.set_tooltip(a)',
        node: "set_tooltip",
        icon: "printer-outline",
        in: 1,
        out: 0,
        data: {},
        template: ``
    },
])
})();