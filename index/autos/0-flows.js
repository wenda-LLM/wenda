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
    app.nodes = app.nodes.concat([
        {
            name: 'autoAI开始',
            // 检查是否处于chat页面环境中，如果不是则将输入参数作为输出参数，如果是则直接反馈输入参数
            function: "{let para=JSON.parse('{{template}}');if(app.question !== undefined && app.question !== null) {add_conversation('User', 'autoflow_start:'+app.question);return [app.question]} else {return [para.userinput]}}",
            node: "autoAI_start",
            icon: "alpha-s-circle-outline",
            in: 0,
            out: 1,
            data: { "template": { "userinput": "这是autoAI开始节点...", "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '闻达auto应用的开始节点，可以模拟chat模式下用户输入文字，如果要生成auto插件，该节点必须作为起始节点。',
            template: `<div class="box">
    <textarea df-template-userinput placeholder='输入模拟的对话信息'></textarea>
    </div>`
        },
        {
            name: 'autoAI结束',
            function: "{if (app.question !== undefined && app.question !== null)add_conversation('Assistant', 'autoflow_end:'+args[0]);console.log(args[0]);}",
            node: "autoAI_end",
            icon: "alpha-e-circle-outline",
            in: 1,
            out: 0,
            data: { "template": { "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '闻达auto应用的结束节点，返回字符串。如果要生成auto插件，该节点必须作为起始节点。',
            template: ``
        },
        {
            name: '用户输入',
            // {{template}} 是指data中的template数据对象,run解析函数会把template对象转成字符串
            function: "let para=JSON.parse('{{template}}');return [para.userinput]",
            node: "prompt",
            icon: "playlist-edit",
            in: 0,
            out: 1,
            data: { "template": { "userinput": '输入提示词或其他文本', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '用户可以在此输入文本，该节点将其转换为信息流对外输出。如果将其用于autos应用开发，在发布前，需要将文本输入框清空。也可以直接将该节点在发布时替换为“autoAI开始”节点',
            template: `<div class="box">
<textarea df-template-userinput placeholder='输入初始 prompt'></textarea>
</div>
`
        },
        {
            name: '对话记录',
            function: '{console.log("对话记录");let rtn=JSON.parse(localStorage["wenda_chat_history"] || "[]");console.dir([rtn]);return [rtn]}',
            node: "chathistory",
            icon: "history",
            in: 1,
            out: 1,
            data: { "template": { "userinput": '输入提示词或其他文本', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '该信息流将返回对话历史记录',
            template: ``
        },
        {
            name: '大模型对话',
            function: 'return [send(args[0],"",show=false)]',
            node: "send",
            icon: "chat",
            in: 1,
            out: 1,
            data: { "template": { "userinput": '输入提示词或其他文本', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '和大语言模型对话',
            template: ``
        },
        {
            name: 'LLM高级对话',
            function: '{let para=JSON.parse("{{template}}");return [send(args[0],args[1])]}',
            node: "chatbyllm",
            icon: "wechat",
            in: 2,
            out: 1,
            data: { "template": { "channel": 'channel_3', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '和大语言模型对话，可以指定模型',
            template: `
          <div>
            <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram bot</div>
            <div class="box">
              <p>调用大模型生成文本</p>
              <p>请在两个输入端分别输入系统提示词和用户提示词</p>
              <p>请选择大语言模型</p>
              <select df-template-channel>
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
            name: '知识库回答',
            function: '[answer_with_fast_zsk(args[0])]',
            node: "answer_with_fast_zsk",
            icon: "book-account",
            in: 1,
            out: 1,
            data: { "template": { "userinput": '输入提示词或其他文本', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '可以调用知识库回答',
            template: ``
        },
        {
            name: '补全文段',
            function: "{let para=JSON.parse('{{template}}');let rtn=send_prompt(args[0],para.userinput,()=>{});return [rtn]}",
            node: "send_prompt",
            icon: "typewriter",
            in: 1,
            out: 1,
            data: { "template": { "userinput": "['\\n\\n','#']", "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '根据输入内容补全全文段',
            template: `<div class="box">请输入停止符：
            <textarea df-template-userinput></textarea></div>`
        },
        // 执行过程中，鉴别出非激活的分支，将非活分支flow[i].runned = true，那么该分支的后续分支如何保障其不运行呢？
        {
            name: '条件分支',
            function: "{let para=JSON.parse('{{template}}');console.dir(para);if(args[0].includes(para.keywords)){return [para.specialText,null]} else return [null,para.specialText]}",
            node: "ifelsenode",
            icon: "apple-keyboard-option",
            in: 1,
            out: 2,
            data: { "template": { "keywords": '太阳', "specialText": '这会儿不是晚上了', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '可以根据条件进行分支输出',
            template: `<div class="box">关键词：<p>判断是否存在如下关键词</p><input df-template-keywords></input><p>包含上述关键词则返回如下信息</p><textarea df-template-specialText></textarea></div>`
        },
        {
            name: '全局变量',
            function: "{let para=JSON.parse('{{template}}');let func_global_vars=JSON.parse(localStorage['wenda_func_global_vars'])||{};func_global_vars[para.var1]='test';localStorage['wenda_func_global_vars']=JSON.stringify(func_global_vars);console.log(localStorage['wenda_func_global_vars']);return [args[0]]}",
            node: "function_global_vars",
            icon: "alpha-x-box-outline",
            in: 1,
            out: 1,
            data: { "template": { "var1": 'var1', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '智能工作流的全局变量，可以用于存储数据或判定条件,请输入变量名称即可，每个节点只能建立一个全局变量,该节点的输入和输出信息是直通的。',
            template: `<div class="box">
            <input df-template-var1 ></input></div>`
        },
        {
            name: '程序块儿',
            function: "{{usercodes}}",
            node: "function",
            icon: "function-variant",
            in: 3,
            out: 1,
            data: { "template": { "codes": "console.log(args[0]+args[1]+args[2]);return [args[0]+args[1]+args[2]+\'->输入节点合并后输出\']", "background": "#ffe8e8", "debug": "调试信息在运行后显示" } },
            desc: '用户自定义的程序块儿，可以在编辑框中输入，用于复杂的数据处理等',
            template: `<div class="box">
            <textarea df-template-codes placeholder='上一节点的输入参数：a,args[1],args[2]'></textarea></div>`
        },
        {
            name: '程序块儿_双输出',
            function: "{{usercodes}}",
            node: "function2",
            icon: "function-variant",
            in: 2,
            out: 2,
            data: { "template": { "codes": 'console.log(args[0]+\'88999\');return [args[0]+\'->第一个输出\',args[1]+\'->第二个输出\']', "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '用户自定义的程序块儿，可以用于处理数据，该程序支持双输出',
            template: `<div class="box">
            <textarea df-template-codes placeholder='参数：args[0],args[1]'></textarea></div>`
        },
        {
            name: '输入文本',
            function: "let para=JSON.parse('{{template}}');return [para.userinput]",
            node: "input_prompt",
            icon: "import",
            in: 0,
            out: 1,
            data: { "template": { "userinput": "just a test", "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '用户自定义的程序块儿，可以用于处理数据，该程序支持双输出',
            template: `<div class="box">
            <textarea df-template-codes placeholder='参数：args[0],args[1]....'></textarea></div>`

        },
        {
            name: '提示框',
            function: 'alert(args[0])',
            node: "alert",
            icon: "alert-circle",
            in: 1,
            out: 0,
            data: { "template": { "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '信息提示框',
            template: ``
        },
        {
            name: '控制台打印',
            function: 'console.log(args[0])',
            node: "console_log",
            icon: "printer-outline",
            in: 1,
            out: 0,
            data: { "template": { "background": '#0fe8e8', "debug": '调试信息在运行后显示' } },
            desc: '通过浏览器控制台打印信息',
            template: ``
        },
        // {{template}}是上一个节点输入的数据？a b c 是用户输入到这个节点的三个数据，{1}、{2}、{3} 是用户输入到节点输入框中的数据 
        {
            name: '信息汇聚模板',
            function: "{let para=JSON.parse('{{template}}');return [para.userinput.replace('{1}',args[0]).replace('{2}',args[1]).replace('{3}',args[2])]}",
            node: "template",
            icon: "text-box-plus",
            in: 3,
            out: 1,
            data: { "template": { "background": '#ffe8e8', "debug": '调试信息在运行后显示' } },
            desc: '可以将多路输入信息汇聚到一个输出中,注意输入内容按照{1}{2}{3}格式填写',
            template: `<div class="box">分别输入需要处理的信息
            <textarea df-template-userinput placeholder='输入内容{1}{2}{3}'></textarea>
                使用多路输入量输出模板</div>`
        },
        {
            name: '格式化文本',
            function: 'return [args[0].replace(/ +/g, \' \').replace(/[\\r\\n]+/g, \'\\n\').replace(/^[\\n\\s\\t]+/, \'\').replace(/[\\n\\s\\t]+$/, \'\')]',
            node: "format",
            icon: "text-box-plus",
            in: 1,
            out: 1,
            data: {},
            template: ``
        },
    ])

}