// ==UserScript==
// @name         猫猫也会的图块化编程
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  使用图块化编程的方式进行简单的auto开发
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

app.plugins.push({ icon: "cat", url: "static/blockly.html", hide_title: true })
window.addEventListener('message', function (e) {
    if (e.data.from == '猫猫也会的图块化编程') {
        let data = e.data.data
        data = "async ()=>{" + data + "}"
        console.log(data)
        load_feature({
            名称: "猫猫也会的图块化编程",
            描述: "",
            问题: eval(data)
        })
        this.alert("载入成功")
    }
    if (e.data.from == '猫猫也会的图块化编程_保存') {
        let data = e.data.data
        data = `// @name 猫猫编程${Date.now()}
        功能.push({
            名称: "猫猫编程${Date.now()}",
            描述: "根据主题撰写内容翔实、有信服力的论文",
            问题: async () => {`+ data + "} })"
        add_auto(data)
        this.alert("载入成功")
    }
    if (e.data.from == '猫猫也会的图块化编程_分析') {
        let data = e.data.data
        data = data.replace(/window\.alert/g, "alert").replace(/await/g, "")
        lsdh(false)
        send("我正在教小朋友使用编程，请分析下列由blocky生成的程序实现的功能:\n" + data, keyword = "请分析我写的程序")
        app.tab = 0
    }
});