// ==UserScript==
// @name         flows
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  闻达自动流的节点
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
if (typeof app.nodes == 'object') {
    app.nodes = app.nodes.concat([{
        name: '初始 prompt',
        function: '`{{template}}`',
        node: "prompt",
        icon: "ray-start",
        in: 0,
        out: 1,
        data: { "template": '' },
        template: `<div class="box">
<textarea df-template placeholder='输入初始 prompt'></textarea></div>`
    },
    {
        name: '单轮对话',
        function: 'send(a)',
        node: "send",
        icon: "chat",
        in: 1,
        out: 1,
        data: {  },
        template: ``
    },
    {
        name: '补全文段',
        function: 'send_prompt(a,{{template}},()=>{})',
        node: "send_prompt",
        icon: "typewriter",
        in: 1,
        out: 1,
        data: { "template": "['\\n\\n','#']" },
        template: `<div class="box">停止符：
<textarea df-template></textarea></div>`
    },
    {
        name: '程序',
        function: '{{template}}',
        node: "function",
        icon: "function-variant",
        in: 3,
        out: 1,
        data: { "template": '' },
        template: `<div class="box">
<textarea df-template placeholder='参数：a,b,c'></textarea></div>`
    },
    {
        name: '报警',
        function: 'alert(a)',
        node: "alert",
        icon: "alert-circle",
        in: 1,
        out: 0,
        data: {},
        template: ``
    },
    {
        name: '控制台打印',
        function: 'console.log(a)',
        node: "console_log",
        icon: "printer-outline",
        in: 1,
        out: 0,
        data: {},
        template: ``
    },
    {
        name: '模板',
        function: '`{{template}}`.replace("{1}",a).replace("{2}",b).replace("{3}",c)',
        node: "template",
        icon: "text-box-plus",
        in: 3,
        out: 1,
        data: { "template": '' },
        template: `<div class="box">Ger Vars
<textarea df-template placeholder='输入内容{1}{2}{3}'></textarea>
Output template with vars</div>`
    },
])

}