// ==UserScript==
// @name         面部识别
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  利用面部识别，检查嘴部开合，控制语音输入开关
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==
if (navigator != null && (window.location.toString().toUpperCase().indexOf("HTTPS") > -1 || window.location.toString().toUpperCase().indexOf("127") > -1)) {

} else {
    alert("当前连接不安全，无法访问媒体")
}
//  constrains = {
//     video: true,
//     audio: true
// }
 tab_index = app.plugins.push({ icon: "face-recognition", url: "static/mp/index.html" })
// navigator.mediaDevices.getUserMedia(constrains)
//     .then(stream => {
//         console.log(tab_index)
//         setTimeout(() => app.tab = tab_index + 2)

//     })
let 上次闭嘴时间 = -1
// app.语音 = true
window.addEventListener('message', function (e) {
    if (e.data.from == '面部识别') {
        let 张嘴幅度 = e.data.data
        // console.log(e.data.data)
        if (app.语音输入中) {
            if (张嘴幅度 < 0.1) {
                if (上次闭嘴时间 != -1) {
                    if (Date.now() - 上次闭嘴时间 > 1000) {
                        上次闭嘴时间 = -1
                        stop_listen()
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
        if (!app.语音输入中 && !app.loading) {
            if (张嘴幅度 > 0.2) {
                listen()
                上次闭嘴时间 = -1
            }

        }
    }
});