// ==UserScript==
// @name         open_api
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  兼容open_api
// @author       lyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
//wenda_auto_default_disabled 这行代码将使本auto默认不启用



send_raw = async (prompt, prompt2, QA_history, onmessage = alert, args = {}) => {

    controller = new AbortController()
    let llm_server = 'http://localhost:3000/v1/chat/completions'
    let res
    try {
        res = await fetch(llm_server , {
            method: "POST",
            headers: {
                "authorization": "Bearer " + app.api_authorization,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({
                model: "gpt-3.5-turbo",
                messages: QA_history.concat([{ role: "user", content: prompt }]),
                stream: true,
                "top_p": app.top_p || 0.5,
                "temperature": app.temperature || 1,
                "presence_penalty": 0.3,
                "frequency_penalty": 0.3,

            }, args)),
            signal: controller.signal
        })

    } catch (error) {
        console.log(error)
        onmessage(result ||error)
        return result || error
    }
    if(res.status === 401) {
        onmessage('401!')
        return '401!'
    }
    let result = ''
    const decoder = new TextDecoder();
    const reader = res.body.getReader();
    const readChunk = async () => {
        return reader.read().then(async ({ value, done }) => {
            value = decoder.decode(value);
            let chunks = value.match(/[^\n]+/g);
            if (!chunks) return readChunk();
            for (let i = 0; i < chunks.length; i++) {
                let chunk = chunks[i];
                chunk = chunk.replace(/^data:\s*/, '').replace(/\r$/, '')
                if (chunk) {
                    try {

                        if (chunk == '[DONE]') return
                        let payload = JSON.parse(chunk);
                        let content = payload.choices[0].delta.content;
                        if (content) {
                            result += content
                            onmessage(result)
                        }
                        if (payload.choices[0].finish_reason == "stop") return
                    } catch {

                    }
                }

            }
            return await readChunk();
        });
    }
    await readChunk()
    return result
}