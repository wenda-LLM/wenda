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
            }]
        }
        ]
    },
    color: () => app.color,
    description: "人物卡"
})