exports.start=(token, handler, bot, admins)=>{
    let express = require('express')
    let app = express()
    app.all('*', function (req, res, next) {
      //设置允许跨域的域名，*代表允许任意域名跨域
      res.header('Access-Control-Allow-Origin', '*')
      //允许的header类型
      res.header('Access-Control-Allow-Headers', 'content-type')
      //跨域允许的请求方式
      res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
      if (req.method.toLowerCase() == 'options') res.send(200)
      //让options尝试请求快速结束
      else next()
    })
    app.get('*',(req,res,next)=>{
        if(req.headers.sessionToken==token){
            handler(req,res,next, bot, admins)
        } else{
            res.send(JSON.stringify({
            code:403,
            msg:"请求失败"
        }))
        
        }
        if(req.headers.sessionToken==undefined){
            res.send(JSON.stringify({
            code:401,
            msg:"请求失败"
        }))
        }
    })
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
}
