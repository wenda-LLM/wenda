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

// V2版本 优化了非提纲内容导致生成失败的问题，优化了小提纲没有主题的问题，在论文前加入了提纲，让论文结构更清晰

const RomanNumerals_Map = {
    'III': 3,
    'II': 2,
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900,
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

function find_RomanNumerals(str) {
    let number = 0;
    for (var p in RomanNumerals_Map) {
        if (str.indexOf(p) != -1) {
            str = str.split(p).join("");
            number += +RomanNumerals_Map[p];
        }
    }
    return number
}

功能.push({
    名称: "写论文",
    描述: "根据主题撰写内容翔实、有信服力的论文",
    问题: async () => {
        let lunwen = ""
        let jieduan = ""
        zsk(false)//关闭知识库
        lsdh(false)//关闭历史对话
        let Q = app.问题
        resp = await send("根据以下主题，写一篇论文提纲：" + Q)
        app.max_length = 4096
        resps = resp.split("\n")
        for (i in resps) {
            resp1 = resps[i]
            if (resp1 != "") {
                let resp2 = resp1.split(".")
                if(resp2.length<2)continue  // 判断非提纲内容
                let num = find_RomanNumerals(resp2[0])
                if (num <= 0 || num == 100) {
                    let xiaoduan = resp1
                    app.对话 = [{ "role": "user", "content": Q }, { "role": "AI", "content": jieduan + ":" + xiaoduan }] // 清空不必要的生成内容
                    lunwen = lunwen + resp1 + "\n"  // 保存提纲
                    let resp3 = await send("根据主题：" + Q +   // 针对有些论文的提纲小段没包含主题导致内容无法关联，所以恢复主题加入
                                       /*"\n提纲：" + resp +*/ //隐藏提纲可以有效避免引用后续内容进行撰写
                        "\n对下列段落进行撰写：" + resp2[1]) // 只撰写当前内容，降低上下文关联，提高内容描述准确度
                    lunwen = lunwen + resp3 + "\n"  // 汇总撰写内容，通过提纲形成上下文关联
                }
                else {
                    jieduan = resp1
                    lunwen = lunwen + resp1 + "\n" // 保存提纲
                }
            }
        }
        lunwen = resp + "\n\n------------------------------正文------------------------------\n" +lunwen // 在论文开头显示完整提纲
        app.对话 = [{ "role": "user", "content": Q }, { "role": "AI", "content": lunwen }]
    },
})