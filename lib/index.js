const {
    PupPlugin, segment, http
} = require('@pupbot/core')
const jwt = require('jsonwebtoken');
let handler = require('./handler')
    .handler
const plugin = new PupPlugin('http-api', '0.1.0')
//插件被启用调用函数
plugin.onMounted((bot, admins) => {
    plugin.onMessage(event => {
        const {
            raw_message
        } = event
        //event为接收到的(消息/事件)对象
        if (raw_message === '开启http' && event.sender.user_id == plugin.mainAdmin) {
            let payload = {
                user_id: event.sender.user_id,
                admin: true
            };
            let secret = 'GOU_XI_SHI_TONG';
            let token = jwt.sign(payload, secret);
            event.reply("请求地址:3000\naccess_token:" + token)
            require('./app')
                .start(token, handler, bot, admins)
        }
    })
})

module.exports = {
    plugin
}