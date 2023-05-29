app.plugins.push({ icon: 'note-edit-outline', url: "/static/wdnote/index.html" })


func.push({
    name: "闻达笔记",
    question: async () => {
        let Q = app.question
        zsk(false)
        lsdh(false)
        app.chat.push({ "role": "user", "content": "以下文段是我准备写笔记的相关素材和观点，请结合如下内容写一篇笔记。\n文段内容：\n" + Q })
        kownladge = await find_dynamic(Q, 3, { 'libraryStategy': "sogowx:3", 'maxItmes': 2 })

        result = []

        if (kownladge.length == 0) {
            app.chat.push({ "role": "AI", "content": "闻达笔记分析:您输入的信息似乎和笔记没有太大关系，我是您的闻达笔记AI助理，主要协助您编写笔记，如果有其他问题，可以咨询我的AI小伙伴们。\n" })
        } else {
            app.chat.push({
                "role": "AI", "content": "闻达笔记分析:\n|标题|内容|\n|--|--|\n" +
                    kownladge.map(i => "|" + i.title + "|" + i.content.replace(/\n/g,' ') + "|").join("\n")
            })
        }

        hascontent = ''

        for (let i in kownladge) {
            if (i > 3) continue //超过三个知识点，直接停
            if (kownladge[i].score > 300) continue //分值越大，信息偏差就越大，为了精确匹配，这里设置为100为阈值
            let prompt = "简要总结下面文段内容：\n" + kownladge[i].content
            // kownladge[i].content + "\n问题：" + Q
            if (kownladge[i].content != '') {
                result.push(await send(prompt))
                hascontent = hascontent + kownladge[i].content
            }
        }

        if (hascontent != '') {
            prompt = "学习以下文段,用中文给出总结。文段内容：\n" + result.join('\n')
            writeNote(await send(prompt))
        } else {
            app.chat.push({ "role": "AI", "content": "非常抱歉，我没有找到相关知识，请再给我一些新的提示。" })
        }

          },
})

writeNote = (s) => {
    // 非空验证
    // if ($('#todo').val() == '') {
    //     return
    // }
    //获取时间
    var time = w_nowTime();
    //todoList
    var todoList = [];
    // 先获取下本地是否存有
    var historyTodoList = JSON.parse(localStorage.getItem("todoList"));
    count = Object.keys(historyTodoList).length;
    if (historyTodoList) {
        //本地有
        var todo = {};
        todo.things = s;
        todo.time = time;
        todo.id = count;
        historyTodoList.push(todo);
        localStorage.setItem('todoList', JSON.stringify(historyTodoList));
        count++;
    } else {
        //本地無
        var todo = {};
        todo.things = s;
        todo.time = time;
        todo.id = count;
        todoList.push(todo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        count++;
    }
    //存储完成后清空输入框
    // $('#todo').val('');
    // 显示在任务列表
    // w_getData();
}


//时间函数
w_nowTime = () => {
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();        //获取当前日(1-31)
    var week = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    var hour = myDate.getHours();       //获取当前小时数(0-23)
    var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    var seconds = myDate.getSeconds();     //获取当前秒数(0-59)
    switch (week) {
        case 0:
            week = `日`
            break;
        case 1:
            week = `一`
            break;
        case 2:
            week = `二`
            break;
        case 3:
            week = `三`
            break;
        case 4:
            week = `四`
            break;
        case 5:
            week = `五`
            break;
        case 6:
            week = `六`
            break;
        default:
    }
    return `${year}年${w_zero(month)}月${w_zero(day)}日${w_zero(hour)}:${w_zero(minutes)}:${w_zero(seconds)}星期${week}`
}

w_zero = (num) => {
    if (num < 10) return "0" + num; else return num;
}