// ==UserScript==
// @name         自动总结问题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  选择这个功能后，直接点发送，会提示选择本地txt文件
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

func.push({
    name: "自动总结问题",
    question: async () => {
        let s = await f_自动总结问题_打开()
        result = []
        paragraphs = s.split(/[\r\n]+/)
        console.log(paragraphs)
        for (const key in paragraphs) {
            const paragraph = paragraphs[key]
            if (!paragraph) continue
            result.push(
                {
                    paragraph: paragraph,
                    question: await send("请你总结下面这段文字，并根据总结内容，用中文提出一个对总结内容有针对性的问题:\n" + paragraph)
                }
            )
        }
        f_自动总结问题_另存为(JSON.stringify(result))
        // 
    },
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