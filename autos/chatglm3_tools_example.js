// ==UserScript==
// @name         chatglm3_tools_example
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  chatglm3工具使用示例
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==
if (app.llm_type == 'glm6b') {
    tools = [
        {
            "name": "track",
            "description": "追踪指定股票的实时价格",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {
                        "description": "需要追踪的股票代码"
                    }
                },
                "required": ['symbol']
            }
        },
        {
            "name": "text-to-speech",
            "description": "将文本转换为语音",
            "parameters": {
                "type": "object",
                "properties": {
                    "text": {
                        "description": "需要转换成语音的文本"
                    },
                    "voice": {
                        "description": "要使用的语音类型（男声、女声等）"
                    },
                    "speed": {
                        "description": "语音的速度（快、中等、慢等）"
                    }
                },
                "required": ['text']
            }
        }
    ]
    app.buttons.push({
        icon: "tools",
        click: async () => {
            lsdh(true)
            app.chat = []
            add_conversation("system", JSON.stringify(tools))
            let result = await send("帮我查询股票10111的价格")
            await send("observation!" + JSON.stringify({ "price": 12412 }))
        },
        color: () => app.color,
        description: "chatglm3工具使用示例"
    })

}