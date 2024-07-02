// ==UserScript==
// @name         llama_server_api
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  兼容llama_server_api
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
//wenda_auto_default_disabled 这行代码将使本auto默认不启用
send_raw = async (prompt, prompt2, QA_history, onmessage = alert, args = {}) => {
    const res = await fetch('/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign({
            max_tokens: app.max_length || 1000,
            messages: QA_history.concat([{ role: "user", content: prompt }]),
            stream: true,
            "names": { "user": "User", "assistant": "Assistant" },
            "stop": ["User:", "\n\n", "Assistant:", "User:"],
            "sampler_override": {
                "type": "Nucleus",
                "top_p": app.top_p || 0.5,
                "top_k": 128,
                "temperature": app.temperature || 1,
                "presence_penalty": 0.3,
                "frequency_penalty": 0.3, "penalty": 400, "penalty_decay": 0.99654026
            }

        }, args)),
        // signal: controller.signal
    });
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
send_prompt = async (prompt, stop, onmessage = alert, args = {}) => {
    controller = new AbortController()
    let llm_server = '/completions'
    const res = await fetch(llm_server + "", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign(
            {
                "stream": true,
                "n_predict": 400,
                "temperature": app.temperature || 0.8, "stop": stop,
                "repeat_last_n": 256,
                "repeat_penalty": 1.18,
                "penalize_nl": false,
                "top_k": 40,
                "top_p": app.top_p || 0.95, "min_p": 0.05,
                "tfs_z": 1,
                "typical_p": 1,
                "presence_penalty": 0,
                "frequency_penalty": 0,
                "mirostat": 0, "mirostat_tau": 5,
                "mirostat_eta": 0.1, "grammar": "",
                "n_probs": 0,
                "min_keep": 0, "image_data": [],
                "cache_prompt": true, "api_key": "", "slot_id": -1,
                "prompt": prompt

            }, args)),
        signal: controller.signal
    });
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
                        let content = payload.content;
                        if (content) {
                            result += content
                            onmessage(result)
                        }
                        if (payload.stop == true) return
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