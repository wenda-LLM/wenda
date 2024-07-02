// ==UserScript==
// @name         自动总结问题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
app.buttons.push({
    icon: "frequently-asked-questions",
    click: async () => {
        let s = await f_自动总结问题_打开()
        app.temperature = 1.5
        let result = []
        paragraphs = s.split(/[\r\n]+/)
        console.log(paragraphs)
        for (const key in paragraphs) {
            const paragraph = paragraphs[key]
            if (!paragraph) continue
            let json = await send_raw("根据下面这段文字内容，提出问题并回答:\n" + paragraph, '', [{
                "role": "user",
                "content": "根据下面这段文字内容，提出问题并回答:\n崇明岛位于长江入海口，是我国第三大岛，面积1200多平方公里，仅次于台湾岛和海南岛，素有“长江门户、东海瀛洲”之称。崇明岛是我国最大的河口冲积岛屿，是由长江携带的泥沙经过常年累月冲积形成的，岛的形状看起来像个大脚印。",
            },
            {
                "role": "AI",
                "content": "Q:崇明岛的位置在哪里？\nA:崇明岛位于中国长江入海口，是中国最大的河口冲积岛屿。\nQ:崇明岛的面积是多少？\nA:崇明岛的面积是1200多平方公里。\nQ:崇明岛是我国第几大岛？\nA:崇明岛是第三大岛，仅次于台湾岛和海南岛。\nQ:崇明岛的形状是什么？\nA:崇明岛的形状看起来像个大脚印。".replace(/:/g, ': '),
            },])
            json = json.split('\n')
            let Q = ''
            let A = ''
            let QA = []
            json.forEach(l => {
                if (l.startsWith('Q:')) Q = l.replace("Q:", "").trim()
                else if (l.startsWith('A:')) {
                    A = l.replace("A:", "").trim()
                    QA.push({ Q, A })
                    Q = ''
                    A = ''
                }
            });
            result.push(
                {
                    paragraph: paragraph,
                    question: QA
                }
            )
        }
        console.log(result)
        f_自动总结问题_另存为(JSON.stringify(result))
    },
    color: () => app.color,
    description: "自动总结问题"
})
f_自动总结问题_另存为 = (stringData) => {
    const blob = new Blob([stringData], {
        type: "text/plain;charset=utf-8"
    })
    const objectURL = URL.createObjectURL(blob)
    const aTag = document.createElement('a')
    aTag.href = objectURL
    aTag.download = Date.now() + "自动总结问题.json"
    aTag.click()
    URL.revokeObjectURL(objectURL)
}
f_自动总结问题_打开 = async () => {
    let contents = ''
    await new Promise(resolve => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = '.txt'
        input.onchange = function () {
            var file = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                contents = e.target.result;
                resolve()
            };
            reader.readAsText(file);
        }
        input.click()
    })
    return contents
}