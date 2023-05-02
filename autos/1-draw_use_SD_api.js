// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==


功能.push({
    名称: "draw_use_SD_api",
    问题: async () => {
        lsdh(false)
        zsk(false)

        Q = await send("使用英语简要描述以下场景：" + app.问题)
        app.loading = true
        add_conversation("user", Q)
        response = await fetch("/api/sd_agent", {
            method: 'post',
            body: JSON.stringify({
                "prompt": `((masterpiece, best quality)), photorealistic,` + Q,
                "steps": 20,
                "negative_prompt": `paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json()
        app.loading = false
        add_conversation("AI", '![](data:image/png;base64,' + json.images[0] + ")")
        save_history()
    },
})