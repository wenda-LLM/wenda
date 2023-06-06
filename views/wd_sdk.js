send_raw = async (prompt, keyword, QA_history, onmessage = alert) => {
    let result = ''
    await new Promise(resolve => {
        ws = new WebSocket(location.origin.replace("http", "ws") + "/ws");
        ws.onmessage = function (event) {
            result = event.data
            onmessage(result)
        };
        ws.onopen = function () {
            ws.send(JSON.stringify({
                prompt: prompt,
                keyword: keyword,
                temperature: app.temperature,
                top_p: app.top_p,
                max_length: app.max_length,
                history: QA_history
            }))
        };
        ws.onclose = function () {
            resolve();
        }
    })
    return result
}
find = async (s, step = 1) => {
    response = await fetch("/api/find", {
        method: "post",
        body: JSON.stringify({
            prompt: s,
            step: step,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    console.table(json);
    app.zhishiku = json;
    return json;
};

find_dynamic = async (s, step = 1, paraJson) => {
    console.table(paraJson);
    response = await fetch("/api/find_dynamic", {
        method: "post",
        body: JSON.stringify({
            prompt: s,
            step: step,
            paraJson: paraJson,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    console.table(json);
    app.zhishiku = json;
    return json;
};

zsk = (b) => {
    b ? app.current_func == '知识库' : app.current_func == ''
};
lsdh = (b) => {
    app.history_on = b;
};

speak = (s) => {
    msg = new SpeechSynthesisUtterance();
    msg.rate = 1;
    msg.pitch = 10;
    msg.text = s;
    msg.volume = 1;
    speechSynthesis.speak(msg);
};
stop_listen = () => {
    recognition.stop();
    app.loading = true;
};
listen = () => {
    recognition = new window.webkitSpeechRecognition();
    let final_transcript = "";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function () { };
    recognition.onresult = function (event) {
        let interim_transcript = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                console.log(final_transcript);
                app.question = final_transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
    };
    recognition.onerror = function (e) {
        console.log(final_transcript);
        alert("语音识别失败:" + e.error);
        app.sst_started = false;
        console.log(e);
    };
    recognition.onend = function () {
        console.log(final_transcript);
        app.question = final_transcript;
        if (final_transcript.length > 1) submit();
        app.sst_started = false;
        console.log(
            "======================" + "end" + "======================"
        );
    };
    recognition.lang = "zh-CN";
    recognition.start();
    app.sst_started = true;
};

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
add_conversation = (role, content, sources = null) => {
    app.chat.push({ role: role, content: content, sources: sources });
};
function MyException(message) {
    this.message = message;
}
get_queue_length = async () => {
    let response = await fetch("/api/chat_now", {
        method: "get",
    })
    let j = JSON.parse(await response.text());
    return j.queue_length
}
get_user_input = () => app.question
save_history = () => {
    localStorage["wenda_chat_history"] = JSON.stringify(app.chat);
};
alert = (text) => {
    app.snackbar_text = text; //.replace(/\n/g,"<br>")
    app.snackbar = true;
}