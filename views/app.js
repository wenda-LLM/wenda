
app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        问题: '',
        对话: JSON.parse(localStorage["对话历史"] || "[]"),
        历史对话: false,
        功能菜单: 功能,
        会话模式: {
            名称: "常规模式",
            描述: "输入问题",
            问题: "",
        },
        chatPDF: false,
        temperature: 0.9,
        max_length: 2048,
        top_p: 0.3,
        snackbar: false,
        snackbar_text: '',
        loading: false,
        drawer: false,
    }),
    methods: {
    }
})
alert = text => {
    app.snackbar_text = text//.replace(/\n/g,"<br>")
    app.snackbar = true
}

载入功能 = (功能) => {
    app.会话模式 = 功能
    app.drawer = false
}
删除 = (item) => {
    app.对话.splice(Math.floor(app.对话.indexOf(item) / 2) * 2, 2)
    保存()
}
保存 = () => {
    localStorage["对话历史"] = JSON.stringify(app.对话)
}
中断 = () => {
    controller.abort()
    controller = new AbortController();
    signal = controller.signal;
}
controller = new AbortController();
signal = controller.signal;
提交 = async () => {
    app.loading = true
    if(app.问题=="") 
    {
        alert("empty")
        app.loading = false
        return
    }
    let QA_history
    if (app.历史对话) {
        QA_history = app.对话
        if (app.对话.length > 6) {
            alert("历史信息过长，将仅保留最后3次对话记忆")

            QA_history = app.对话.slice(app.对话.length - 6)
        }
    }
    else {
        QA_history = []
    }
    已排队到 = false
    setTimeout(read_now, 1000)
    app.对话.push({ role: "user", content: app.问题.replace(/\n+/g, '\n') })
    let 当前会话 = { role: "AI", content: '……' }
    app.对话.push(当前会话)
    try {
        response = await fetch("/api/chat_stream", {
            signal: signal,
            method: 'post',
            body: JSON.stringify({
                prompt: app.会话模式.问题 + app.问题,
                temperature: app.temperature,
                top_p: app.top_p,
                max_length: app.max_length,
                history: QA_history,
                pdf: app.chatPDF
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        app.问题 = ''
        const reader = response.body.getReader();
        let buffer = ''
        while (true) {
            const { value, done } = await reader.read();
            已排队到 = true
            let res = new TextDecoder("utf-8").decode(value)
            buffer += res
            while (buffer.indexOf("///") > -1) {
                if (buffer == '/././') {//应对网络问题
                    done = true
                    break
                }
                buffer = buffer.split("///")
                当前会话.content = buffer[buffer.length - 2]
                buffer = buffer[buffer.length - 1]
            }
            if (done) break
        }
    } catch { }
    app.loading = false
    已排队到 = true
    保存()
}
清除历史 = async () => {
    app.loading = true
    localStorage["对话历史"]=[]
    app.历史对话=false
    app.对话=[]
    app.loading = false
}
read_now = async () => {
    if (!已排队到) {
        response = await fetch("/api/chat_now", {
            method: 'get'
        })
        alert(await response.text())
        setTimeout(read_now, 3000)
    }
}

find = async (s) => {
    response = await fetch("/api/find", {
        method: 'post',
        body: JSON.stringify({
            prompt: s
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.table(await response.json())
}
