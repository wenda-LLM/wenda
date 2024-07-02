// ==UserScript==
// @name         写论文
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  根据题目或提纲写论文
// @author       You
// @match        http://127.0.0.1:17860/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

let RomanNumeralsMap = {
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
    for (var p in RomanNumeralsMap) {
        if (str.indexOf(p) != -1) {
            str = str.split(p).join("");
            number += RomanNumeralsMap[p];
        }
    }
    return number
}

func.push({
    name: "根据标题写论文",
    description: "根据主题撰写内容翔实、有信服力的论文",
    question: async () => {
        lsdh(false)
        Q = app.question
        app.max_length = 4096
        app.chat = []
        resp = (await send("根据以下主题，写一篇高度凝练且全面的论文提纲：" + Q, Q))
            .replace(/\n- /g, '\n1.')//兼容不同格式
            .split("\n")
        content = [resp.join("\n\n"), "------------------------------正文------------------------------"]
        for (let i in resp) {
            let line = resp[i]
            if (line == "") continue
            line = line.split(".")
            if (line.length < 2) {
                continue  // 判断非提纲内容
            }
            content.push(resp[i])   // 保存提纲
            let num = find_RomanNumerals(line[0])
            if (num <= 0 || num == 100) {
                content.push(await send("根据主题：" + Q +
                    "\n对下列段落进行详细的撰写：" + line[1], line[1]) + "\n\n")
            }
        }
        content = content.join("\n\n")
        add_conversation("user",  Q )
        add_conversation("AI",  content )
        console.log(content)

        copy(content)

    },
})
func.push({
    name: "根据提纲写论文",
    description: "根据主题撰写内容翔实、有信服力的论文",
    question: async () => {
        title = app.question
        app.max_length = 4096
        app.chat = []
        resp =title.split("\n")
        title=resp[0]
        content = [resp.join("\n\n"), "------------------------------正文------------------------------"]
        for (let i in resp) {
            let line = resp[i]
            if (line == "") continue
            line = line.split(".")
            if (line.length < 2) {
                continue  // 判断非提纲内容
            }
            content.push(resp[i])   // 保存提纲
            let num = find_RomanNumerals(line[0])
            if (num <= 0 || num == 100) {
                content.push(await send("根据主题：" + title +
                    "。对下列段落进行详细的撰写：" + line[1], line[1]))
            }
        }
        content = content.join("\n\n")
        add_conversation("user",  title )
        add_conversation("AI",  content )
        console.log(content)

        copy(content)
    },
})
