
const messages = {
    en: {
        wenda: 'Wenda',
        history: 'History',
        send: 'Send',
        abord: 'Abort',
        clear_history: 'Clear History',
        chat: 'Chat',
        setting: 'Settings',
        feature_selection: 'Feature Selection'
    },
    'zh-CN': {
        wenda: '闻达',
        zhishiku: "知识库",
        history: "对话历史",
        send: "发送",
        abord: "中断",
        clear_history: "清除历史",
        chat: "对话",
        setting: "设置",
        feature_selection: "功能选择",
        re_generate: "重新生成",
        title: "标题",
        content: "内容",
        input_question:"输入问题",
        save_to_disk:"保存至硬盘",
        memory_name:"记忆区名称",
        simplify_historical_information:"简化历史",
        upload:"上传"
    }
    ,

    'ja': {
        history: '履歴',
        send: '送信',
        abord: '中止',
        clear_history: '履歴を消去',
        chat: 'チャット',
        setting: '設定',
        feature_selection: '機能選択'
    }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: navigator.language, // set locale
    messages, // set locale messages
})