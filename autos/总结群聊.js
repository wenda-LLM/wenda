// ==UserScript==
// @name         自动总结群聊
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  for cyclekiller/chatsum
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

//wenda_auto_default_disabled 这行代码将使本auto默认不启用
app.buttons.push({
    icon: "account-group",
    click: async () => {
        lsdh(false)
        let s = await f_自动总结群聊_打开()
        paragraphs = s.replace(/[\r\n]+/g, "\n")
        send(`raw!Instruction: 下面是qq群“ChatRWKV技术研发群”的一段聊天记录节选，“[捂脸]”这种格式表示qq表情，“@某人”这种格式表示对某人说。注意不同的发言之间可能存在交错。请总结这段聊天记录的主要内容。
Input: ${paragraphs}
Response: 这段聊天记录的主要内容是`)
        // 
    },
    color: () => app.color,
    description: "自动总结群聊"
})
f_自动总结群聊_打开 = async () => {
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