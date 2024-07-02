// ==UserScript==
// @name         蓝色主题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  开启后，闻达界面变为蓝色主题
// @author       lyyyyy
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @run-at document-idle
// @grant        none
// ==/UserScript==
//wenda_auto_default_disabled 这行代码将使本auto默认不启用
app.color = "blue"