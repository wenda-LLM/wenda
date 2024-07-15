// ==UserScript==
// @name         知识库
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  利用知识库回答问题
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
get_title_form_md = (s) => {
    console.log(s)
    try {
        return s.match('\\[(.+)\\]')[1]
    } catch {
        return s
    }
}
get_url_form_md = (s) => {
    console.log(s)
    try {
        return s.match('\\((.+)\\)')[1]
    } catch {
        return s
    }
}

f批量上传 = async () => {
    app.b批量上传中 = true
    app.i批量上传进度 = 0
    app.l表格读取结果.forEach(async (question) => {
        await add_memory_by_string(question.问题, question.回答)
        app.i批量上传进度 += 1
        if (app.i批量上传进度 == app.l表格读取结果.length)
            app.b批量上传中 = false
    })
}
f载入表格 = async () => {
    // await new Promise(resolve => {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xlsx'
    input.onchange = function () {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            let contents = e.target.result;
            var workbook = XLSX.read(new Uint8Array(contents), {
                type: 'array'
            });
            app.l表格读取结果 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            // resolve()
        };
        reader.readAsArrayBuffer(file);
    }
    input.click()
    // })
}
window.answer_with_zsk = async (Q) => {
    // lsdh(false)
    app.top_p = 0.2
    app.chat.push({ "role": "User", "content": Q })
    kownladge = (await find(Q, 5))
    console.log(kownladge)
    kownladge = kownladge.filter(i => i.score > 60).map(i => ({
        title: `${get_title_form_md(i.title)}(${i.score})`,
        url: get_url_form_md(i.title),
        content: i.content
    }))
    if (kownladge.length > 0) {
        answer = {
            role: "Assistant",
            content: "",
            sources: kownladge
        }
        app.chat.push(answer)
        result = []
        let index = 0
        await new Promise(resolve => {

            kownladge.forEach(async (question) => {
                let prompt = app.zsk_summarize_prompt + '\n' +
                    question.content + "\n问题：" + Q
                result.push(await send(prompt, keyword = Q, show = false))

                answer.content = `正在查找：${index}/${kownladge.length}`
                index += 1
                if (index == kownladge.length)
                    resolve()
            })
        })
        app.chat.pop()
        app.chat.pop()
        let prompt = app.zsk_answer_prompt + '\n' +
            result.join('\n') + "\n问题：" + Q
        return await send(prompt, keyword = Q, show = true, sources = kownladge)
    } else {
        app.chat.pop()
        sources = [{
            title: '未匹配到知识库',
            content: '本次对话内容完全由模型提供'
        }]
        return await send(Q, keyword = Q, show = true, sources = sources)
    }
}
func.push({
    name: "知识库",
    description: "通过知识库回答问题",
    question: async (Q) => {
        answer_with_zsk(Q)
    }
})
window.answer_with_fast_zsk = async (Q) => {
    // lsdh(false)
    app.top_p = 0.2
    kownladge = (await find(Q, app.zsk_step)).filter(i => !i.score || i.score < 120).map(i => ({
        title: get_title_form_md(i.title),
        url: get_url_form_md(i.title),
        content: i.content
    }))
    app.chat.pop()
    sources = [{
        title: '未匹配到知识库',
        content: '本次对话内容完全由模型提供'
    }]
    return await send(Q, keyword = Q, show = true, sources = sources)
}
app.nodes && app.nodes.push({
    name: '知识库',
    function: 'answer_with_fast_zsk(a)',
    node: "answer_with_fast_zsk",
    icon: "book-account",
    in: 1,
    out: 1,
    data: { "template": '' },
    template: ``
})
func.push({
    name: "快速知识库",
    question: window.answer_with_fast_zsk
}
)