exports.handler = (req, res, next, bot, admins) => {
    let {
        v4: uuid
    } = require('uuid')
    class event {
        constructor(ret) {
            this.self = {
                'platform': 'qq',
                'user_id': bot.uin
            }
            this.ret = ret
        }

    }
    class Message extends event {
        constructor(sub_type, ret) {
            super(ret)
            this.id = uuid()
            this.type = 'message'
            this.detail_type = 'message'
            this.sub_type = sub_type
        }

    }
    class Notice extends event {
        constructor(id, sub_type, ret) {
            super(ret)
            this.id = id
            this.type = 'notice'
            this.detail_type = 'notice'
            this.sub_type = sub_type
        }

    }
    class System extends event {
        constructor(id, sub_type, ret) {
            super(ret)
            this.id = id
            this.type = 'meta'
            this.detail_type = 'system'
            this.sub_type = sub_type
        }

    }
    class Request extends event {
        constructor(id, sub_type, ret) {
            super(ret)
            this.id = id
            this.type = 'request'
            this.detail_type = 'request'
            this.sub_type = sub_type
        }

    }
    if (req.body.echo) {
        const {
            action, params, echo
        } = req.body

    } else {
        const {
            action, params
        } = req.body
    }
    var handlers = {
        sendGroupMsg: (options) => {
            return new Message('group', bot.sendGroupMsg(options))
        }
    }
    function sender(action, params, echo){
        if(!echo){
            try {
        
        res.send(JSON.stringify(handlers[action](options)))
    } catch (e) {
        res.send(JSON.stringify({
            code: 404,
            msg: "Not Found"
        }))
        res.status(404)
    }
        } else{
            try {
        
        res.send(JSON.stringify(Object.assign(handlers[action](options), {echo:echo})))
    } catch (e) {
        res.send(JSON.stringify({
            code: 404,
            msg: "Not Found"
        }))
        res.status(404)
    }
        
        }
    
    }
}