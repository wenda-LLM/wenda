// ==UserScript==
// @name         Lora切换测试
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  GLM-6B Lora在线切换api测试。注意要在配置中开启LORA
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==


func.push({
    name: "Lora切换测试",
    question: async () => {
        lsdh(false)
        Q=app.question
        lora_name="model\\chatglm-6b-belle-zh-lora"//https://huggingface.co/shibing624/chatglm-6b-belle-zh-lora
        await lora_load_adapter(lora_name)
        sources = [{
            title: 'belle_lora',
            content: lora_name
        }]
        await send(Q, keyword = Q, show = true, sources = sources)
        lora_name="model\\chatglm-6b-csc-zh-lora"//https://huggingface.co/shibing624/chatglm-6b-csc-zh-lora
        await lora_load_adapter(lora_name)
        sources = [{
            title: '纠错_lora',
            content: lora_name
        }]
        await send(Q, keyword = Q, show = true, sources = sources)
    },
})

lora_load_adapter= async (lora_name) => {
    response = await fetch("/api/lora_load_adapter", {
        // signal: signal,
        method: 'post',
        body: JSON.stringify({
            lora_path: lora_name,
            adapter_name: lora_name,
           }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    alert(await response.text())
}