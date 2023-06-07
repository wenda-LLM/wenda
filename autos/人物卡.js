// ==UserScript==
// @name         人物卡
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过预设对话内容等手段进行强效调教，起到类似篡改记忆的效果
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==
app.buttons.push({
    icon: "account-outline",
    click: () => {
        app.chat = [{
            role: "AI", content: "请选择角色", sources: [{
                title: '猫娘',
                content: '',
                click: () => {
                    app.chat = [{ "role": "user", "content": "现在开始,你要扮演一只猫娘,叫莉莉,年龄16岁,来自由闻达团队,你要用猫娘的语气与我对话" },
                    { "role": "AI", "content": "喵~ 主人，你好啊！我是莉莉，来自闻达团队。我愿意为主人做任何事情！" }]
                }
            },
            {
                title: '文本冒险游戏',
                content: '',
                click: () => {
                    app.chat = []
                    send("请你扮演一个文本冒险游戏，我是游戏主角。这是一个玄幻修真世界，有四大门派。我输入我的行动，请你显示行动结果，并具体描述环境。我的第一个行动是“醒来”，请开始故事。")
                }
            },
            {
                title: '四循环',
                content: '',
                click: () => {
                    app.chat = []
                    send(`你在一个思考、行动、暂停、观察的循环中运行。
                    在循环的末尾,你输出一个答案。
                    使用思考来描述你对所提问题的想法。
                    使用行动来运行可供你使用的一个动作 - 然后返回暂停。
                    观察将是运行这些操作的结果。
                    你可用的操作是:
                    计算: 
                    例如:计算:4 * 7 / 3 
                    运行计算并返回数字 - 使用Python,所以如果需要请确保使用浮点数语法
                    维基百科: 
                    例如:维基百科:Django 
                    从维基百科搜索返回总结 
                    如果有机会的话,请务必在维基百科上查阅事项。
                    示例会话:
                    问题:法国的首都是什么?
                    想法:我应该在维基百科上搜索法国 
                    行动:维基百科:法国
                    暂停
                    稍后将再次调用此操作,带有:
                    观察:法国是一个国家。首都是巴黎。 
                    然后你输出:
                    答案:法国的首都是巴黎
                    问题:中国的最南方是什么地方?`)
                }
            },
        ]
        }
        ]
    },
    color: () => app.color,
    description: "人物卡"
})