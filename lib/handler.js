exports.handler=(req,res,next, bot, admins)=>{
    let func=req.url.match(/\/(.*?)\?/)[1]
    let options=Object.values(req.query)
    var handlers={
        sendGroupMsg:(options)=>{
            try{
                bot.sendGroupMsg(options)
            } catch(e){
                res.send(JSON.stringify({
                    code:400,
                    error:e
                }))
            }
        }
    
    }
    try{
        handlers[func](options)
    } catch(e){
        res.send(JSON.stringify({
                    code:404,
                    msg:"Not Found"
                }))
    }
    

}