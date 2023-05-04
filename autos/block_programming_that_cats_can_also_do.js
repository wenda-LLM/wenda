// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

app.plugins.push({ icon: "cat", url: "static/blockly.html" })
window.addEventListener('message', function (e) {
    if (e.data.from == '猫猫也会的图块化编程') {
        let data = e.data.data
        data="async ()=>{"+data+"}"
        console.log(data)
        load_feature({
            名称: "猫猫也会的图块化编程",
            描述: "",
            问题:eval(data)
        })
        this.alert("载入成功")
    }
});