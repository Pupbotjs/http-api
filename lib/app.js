exports.start = (token, handler, bot, admins) => {
    let express = require('express')
    let app = express()
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.all('*', function(req, res, next) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header('Access-Control-Allow-Origin', '*')
        //允许的header类型
        res.header('Access-Control-Allow-Headers', 'content-type')
        //跨域允许的请求方式
        res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
        res.header('Content-Type', 'application/json')
        if (req.method.toLowerCase() == 'options') res.send(200)
        //让options尝试请求快速结束
        else next()
    })
    app.post('*', (req, res, next) => {
        if (req.headers['Content-Type'] == 'application/json' && req.headers['User-Agent'] !== undefined && req.headers['X-OneBot-Version'] == 12 && req.headers['X-Impl'] == 'PupBot-http-api') {
            if (req.headers.Authorization == 'Bearer ' + token) {
                handler(req, res, next, bot, admins)

            } else {
                if (req.headers.access_token == token) {
                    handler(req, res, next, bot, admins)
                } else {
                    res.send(JSON.stringify({
                        code: 401,
                        msg: "Unauthorized"
                    }))
                    res.status(401)
                }
            }

        } else {
            res.send(JSON.stringify({
                code: 415,
                msg: 'Unsupported Media Type'
            }))
            res.status(415)
        }
    })
    app.get('*', (req, res, next) => {
        res.send(JSON.stringify({
            code: 405,
            msg: 'Method Not Allowed'

        }))
        res.status(405)

    })
    app.put('*', (req, res, next) => {
        res.send(JSON.stringify({
            code: 405,
            msg: 'Method Not Allowed'

        }))
        res.status(405)

    })
    app.delete('*', (req, res, next) => {
        res.send(JSON.stringify({
            code: 405,
            msg: 'Method Not Allowed'

        }))
        res.status(405)

    })
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
}