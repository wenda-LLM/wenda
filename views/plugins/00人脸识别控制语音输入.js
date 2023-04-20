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
app.plugins.push({ name: "面部识别模组", url: "static/mp/index.html" })
let 上次闭嘴时间 = -1
app.语音=true
window.addEventListener('message', function (e) {
    if (e.data.from == '面部识别模组') {
        let 张嘴幅度 = e.data.data
        // console.log(e.data.data)
        if (app.语音输入中) {
            if (张嘴幅度 < 0.1) {
                if (上次闭嘴时间 != -1) {
                    if (Date.now() - 上次闭嘴时间 > 1000) {
                        上次闭嘴时间 = -1
                        recognition.stop()
                        return
                    }
                } else {
                    上次闭嘴时间 = Date.now()
                    return
                }
            } else {
                上次闭嘴时间 = -1
                return
            }
        }
        if (!app.语音输入中&&!app.loading) {
            if (张嘴幅度 > 0.2) {
                listen()
                上次闭嘴时间 = -1
            }

        }
    }
});