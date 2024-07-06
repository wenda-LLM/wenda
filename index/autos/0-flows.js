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
        function: '{return [`{{template}}`]}',
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
        function: '[await send(a)]',
        node: "send",
        icon: "chat",
        in: 1,
        out: 1,
        data: {},
        template: ``
    },
    {
        name: '对话(LLMs可选)',
        function: 'send(a,b)',
        node: "chatbyllm",
        icon: "chat",
        in: 2,
        out: 1,
        data: { "channel": 'channel_3'},
        template:  `
          <div>
            <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram bot</div>
            <div class="box">
              <p>调用大模型生成文本</p>
              <p>请在两个输入端分别输入系统提示词和用户提示词</p>
              <p>请选择大语言模型</p>
              <select df-channel>
                <option value="channel_1">chatGLM2</option>
                <option value="channel_2">chatGLM3</option>
                <option value="channel_3">Qwen2-0.5B</option>
                <option value="channel_4">Qwen2-7B</option>
              </select>
            </div>
          </div>
          `
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
<input df-template></input></div>`
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
        name: '程序（多输出）',
        function: '{{template}}',
        node: "function2",
        icon: "function-variant",
        in: 3,
        out:2,
        data: { "template": "{return [a+'wenda',b+'我喜欢']}" },
        template: `<div class="box">
<textarea df-template placeholder='参数：a,b'></textarea></div>`
    },
    {
        name: '代码块',
        function: '{{template}}',
        node: "code_block",
        icon: "text-box-plus",
        in: 1,
        out: 1,
        data: { "template": 'alert(`这是一段警告框代码！`);send(a)' },
        template: `<div class="box">请输入源码
<textarea df-template placeholder='alert("这是一段警告框代码！");send(a)'></textarea>
</div>`
    },
    {
        name: '输入文本',
        function: '[prompt(`{{template}}`)]',
        node: "input_prompt",
        icon: "import",
        in: 0,
        out: 1,
        data: { "template": "请输入文本：" },
        template: `<div class="box">输入提示：
<input df-template></input></div>`
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
    // {{template}}是上一个节点输入的数据？a b c 是用户输入到这个节点的三个数据，{1}、{2}、{3} 是用户输入到节点输入框中的数据 
    {
        name: '模板',
        function: '[`{{template}}`.replace("{1}",a).replace("{2}",b).replace("{3}",c)]',
        node: "template",
        icon: "text-box-plus",
        in: 3,
        out: 1,
        data: { "template": '' },
        template: `<div class="box"><textarea df-template placeholder='输入内容{1}{2}{3}'></textarea></div>`
    },
    {
        name: '格式化文本',
        function: '[a.replace(/[\\r\\n]+/g, \'\\n\').replace(/^[\\n\\s\\t]+/, \'\').replace(/[\\n\\s\\t]+$/, \'\')]',
        node: "format",
        icon: "text-box-plus",
        in: 1,
        out: 1,
        data: {  },
        template: ``
    },
    ])

}