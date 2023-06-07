// ==UserScript==
// @name         导入导出聊天记录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  使用Ctrl+S、Ctrl+L导入导出聊天记录
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
document.addEventListener('keydown', async function (e) {
    if (e.key.toLowerCase() == 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        f另存为聊天记录(JSON.stringify(app.chat))
        alert('saved');
    }
    if (e.key.toLowerCase() == 'l' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        app.chat = JSON.parse(await f打开聊天记录())
        alert('loaded');
    }
});
f另存为聊天记录 = (stringData) => {
    const blob = new Blob([stringData], {
        type: "text/plain;charset=utf-8"
    })
    const objectURL = URL.createObjectURL(blob)
    const aTag = document.createElement('a')
    aTag.href = objectURL
    aTag.download = Date.now() + "-聊天记录.json"
    aTag.click()
    URL.revokeObjectURL(objectURL)
}
f打开聊天记录 = async () => {
    let contents = ''
    await new Promise(resolve => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
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