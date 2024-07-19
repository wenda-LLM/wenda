
load_models = async () => {
    let server_models = await fetch("/api/tags");
    server_models = await server_models.json();
    app.server_models = window.server_models = server_models.models
    if (!localStorage["wenda_model"]) {
        if (server_models.find(i => i.name == 'qwen:32b'))
            set_model('qwen:32b')
        else
            set_model(window.server_models[0].name)
    } else {
        set_model(localStorage["wenda_model"])
    }
};
set_model = name => {
    model = localStorage["wenda_model"] = name
    server_models.forEach(element => {
        if (model == element.name) element.using = true
        else element.using = false
    });
    app.server_models = JSON.parse(JSON.stringify(server_models))
}
load_models();
chat_names = { "user": "User", "assistant": "Assistant" }
send_raw = async (prompt, prompt2, QA_history, onmessage = alert, args = {}) => {
    controller = new AbortController()
    let llm_server = '/api/chat'
    // let llm_server = 'http://127.0.0.1:11434/api/chat'
    // llm_server = 'https://mobius.sea-group.org/v1/chat/completions'
    // llm_server = '//127.0.0.1:8000/v1/chat/completions'
    let res
    let result = ''
    try {
        res = await fetch(llm_server + "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign({
                max_tokens: app.max_length || 1000,
                messages: QA_history.concat([{ role: "user", content: prompt }]),
                stream: true,
                "model": model,
                "names": chat_names,
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
            signal: controller.signal
        });
    } catch (error) {
        console.log(error)
        onmessage(result || '网络连接失败')
        return result || '网络连接失败'
    }

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
                        // console.log(payload.message)
                        let content = payload.message.content;
                        if (content) {
                            result += content
                            onmessage(result)
                        }
                        if (payload.done) return
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
    let controller = new AbortController()
    let llm_server = '/api/generate'
    // let llm_server = 'http://127.0.0.1:11434/api/generate'
    const res = await fetch(llm_server + "", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign(
            {
                "stream": true,
                "model": model,
                "n_predict": 400,
                "temperature": app.temperature || 0.8,
                "stop": stop,
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
                "prompt": prompt,
                'raw': true

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
                        let content = payload.response;

                        if (content) {
                            result += content
                            for (s of stop) {
                                if (result.indexOf(s) > -1) {

                                    onmessage(result.replace(s, ''))
                                    controller.abort()
                                    return
                                }
                            }
                            onmessage(result)
                        }
                        if (payload.done) return
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
let isSpeaking = false;
speak = (s) => {
    msg = new SpeechSynthesisUtterance();
    msg.rate = 1;
    msg.pitch = 10;
    msg.text = s;
    msg.volume = 1;
    speechSynthesis.speak(msg)

    msg.onstart = (event) => {
    }

    msg.onend = (event) => {
        isSpeaking = false;
    }

}
stop_listen = () => {
    recognition.stop()
    app.loading = true
}
listen = () => {
    if (isSpeaking) return;
    recognition = new window.webkitSpeechRecognition;
    let final_transcript = '';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function () {
    };
    recognition.onresult = function (event) {
        let interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                console.log(final_transcript);
                app.question = final_transcript
            } else {

                interim_transcript += event.results[i][0].transcript;
            }
        }
    };
    recognition.onerror = function (e) {
        console.log(final_transcript);
        alert('语音识别失败:', e.error)
        app.sst_started = false
        console.log('======================' + "error" + '======================', e);
    };
    recognition.onend = function () {
        console.log(final_transcript);
        app.question = final_transcript
        if (final_transcript.length > 1)
            submit()
        app.sst_started = false
        console.log('======================' + "end" + '======================');
    }
    recognition.lang = "zh-CN";
    recognition.start()
    app.sst_started = true
}


copy = (s) => {
    navigator.permissions
        .query({ name: "clipboard-write" })
        .then((result) => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard
                    .writeText(s.replace(/\n+/g, "\n"))
                    .then(() => {
                        alert("文本已经成功复制到剪切板");
                        console.log("文本已经成功复制到剪切板");
                    })
                    .catch((err) => { });
            } else {
                alert(
                    "当前无操作权限。请使用最新版本Chrome浏览器，并在浏览器高级设置-页面设置中允许访问剪切板"
                );
                console.log(
                    "当前无操作权限。请使用最新版本Chrome浏览器，并在浏览器高级设置-页面设置中允许访问剪切板"
                );
            }
        });
};
add_conversation = (role, content, sources = null, no_history = false) => {
    app.chat.push({ role: role, content: content, sources: sources, no_history: no_history });
};
function MyException(message) {
    this.message = message;
}
save_history = () => {
    localStorage["wenda_chat_history"] = JSON.stringify(app.chat);
};


if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
make_db = async (name) => new window.VectorDB({ vectorPath: name });
find_memory_by_vector = async (embedding, limit = 20, db = window.db) => await db.query(embedding, { limit: limit })
add_memory_by_vector = async (obj, db = window.db) => await db.insert(obj)
del_memory_by_key = async (key, db = window.db) => await db.delete(key);
make_embedding_by_string = async (prompt) => {
    res = await fetch("/api/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            prompt: prompt,
            "model": model
        })
    });
    return await res.json();
}
find_memory_by_string = async (string, limit = 20, name = 'embedding') => {
    let db = await make_db(name)
    let embedding = await make_embedding_by_string(string)
    return find_memory_by_vector(embedding.embedding, limit, db)
}
add_memory_by_string = async (string, content, name = 'embedding') => {
    let db = await make_db(name)
    let embedding = await make_embedding_by_string(string)
    return await add_memory_by_vector({ embedding: embedding.embedding, text: string, content: content }, db)
}
find = async (string, limit = 20) => {
    let r = await find_memory_by_string(string, limit = 20)
    app.zhishiku = r.map(i => ({
        title: i.object.text,
        score: Math.round(i.similarity * 100),
        content: i.object.content
    }))
    return app.zhishiku
}