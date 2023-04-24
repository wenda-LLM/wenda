
const messages = {
    en: {
        wenda: 'Wenda'
    },
    'zh-CN': {
        wenda: '闻达',
        zhishiku: "知识库",
        history: "历史",
        send:"发送",
        abord:"中断",
        clear_history:"清除历史",
        chat:"对话",
        setting:"设置",
        feature_selection:"功能选择"
    }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: navigator.language, // set locale
    messages, // set locale messages
})