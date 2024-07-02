// ==UserScript==
// @name         AI00_api
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  兼容AI00_api
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

if (document.location.href.indexOf("plugins")>0) {
    make_embedding_by_string = async (prompt) => {
        res = await fetch("/api/oai/v1/embeddings", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                "input": prompt,
                "layer": 16,
                "state": "00000000-0000-0000-0000-000000000000"
            })
        });
        let json = await res.json()
        console.log(json)
        return json.data[0];
    }
    send_raw = async (prompt, prompt2, QA_history, onmessage = alert, args = {}) => {
        let llm_server = '/api/oai/chat/completions'
        const res = await fetch(llm_server + "", {
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
        let llm_server = '/api/oai/completions'
        const res = await fetch(llm_server + "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({
                prompt: [prompt],
                max_tokens: 2000,
                stream: true,
                "stop": stop,
                "sampler_override": {
                    "type": "Nucleus", "top_p": app.top_p || 0.5,
                    "top_k": 128, "temperature": app.temperature || 0.8, "presence_penalty": 0.6,
                    "frequency_penalty": 0.9, "penalty": 800, "penalty_decay": 0.99654026
                }

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
    send_chooses = async (prompt, choices) => {
        controller = new AbortController()
        let llm_server = '/api/oai/chooses'
        const res = await fetch(llm_server + "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({
                input: [prompt],
                choices: choices

            })),
            signal: controller.signal
        });
        return (await res.json()).data
    }
}