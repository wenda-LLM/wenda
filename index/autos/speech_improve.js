// ==UserScript==
// @name         语音增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过替换闻达函数，提升语音功能，同时也用于演示如何用外部api提供语音服务
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==

speak_fifo = []
speak = text_to_speak => {
    let mp3 = new Audio(`http://127.0.0.1:9880/?text=${text_to_speak}&seed=9&text_language=zh`) // 创建音频对象
    speak_fifo.push(mp3)
    console.log(text_to_speak)
    mp3.addEventListener('ended', function () {
        speak_fifo = speak_fifo.slice(1)
        if (speak_fifo[0])
            speak_fifo[0].play()
        else {
            if (!app.loading)
                app.is_tts_saying = false
        }
    }, false);
    if (speak_fifo.length == 1) {
        mp3.play()
        app.is_tts_saying = true
    }
}
