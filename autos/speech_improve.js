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

let isSpeaking = true;
speak = (s) => {
    msg = new SpeechSynthesisUtterance();
    msg.rate = 1;
    msg.pitch = 10;
    msg.text = s;
    msg.volume = 1;
    speechSynthesis.speak(msg)

    msg.onstart = (event) => {
    }

    msg.onend = (event) => {
        isSpeaking = true;
    }

}
stop_listen = () => {
    recognition.stop()
    app.loading = true
}
listen = () => {
    if (isSpeaking == false) return;
    recognition = new window.webkitSpeechRecognition;
    let final_transcript = '';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function () {
    };
    recognition.onresult = function (event) {
        let interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                console.log(final_transcript);
                app.question = final_transcript
            } else {

                interim_transcript += event.results[i][0].transcript;
            }
        }
    };
    recognition.onerror = function (e) {
        console.log(final_transcript);
        alert('语音识别失败:',e.error)
        app.sst_started = false
        console.log('======================' + "error" + '======================', e);
    };
    recognition.onend = function () {
        console.log(final_transcript);
        app.question = final_transcript
        if (final_transcript.length > 1)
            提交()
        app.sst_started = false
        console.log('======================' + "end" + '======================');
    }
    recognition.lang = "zh-CN";
    recognition.start()
    app.sst_started = true
}
