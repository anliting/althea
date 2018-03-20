function connectionCreateSession(port){
    let session=Object.setPrototypeOf({
        login:this.login.bind(this),
        send(val){
            val.port=port
            this._send(val)
        },
        sendValue(val){
            this.send({
                value:val
            })
        },
    },this)
    Object.defineProperty(session,'logout',{get:()=>{
        this.logout
    }})
    return session
}
function connectionGetSession(port){
    if(!this._sessions[port])
        this._sessions[port]=connectionCreateSession.call(this,port)
    return this._sessions[port]
}
async function connectionHandleMessage(message){
    let doc
    try{
        doc=JSON.parse(message)
    }catch(e){
        return
    }
    if(!(
        typeof doc=='object'&&
        typeof doc.function=='string'&&
        (!('port' in doc)||typeof doc.port=='number')
    ))
        return response({error:'docCheckFailed'})
    if(doc.function in this.althea.queryFunctions){
        let res,err
        let session=connectionGetSession.call(this,doc.port)
        try{
            this.currentUser=await this._currentUserPromise
            res=await this.althea.queryFunctions[doc.function](
                doc.arguments,
                session
            )
        }catch(e){
            err=e instanceof Error?{
                message:e.toString(),
                stack:e.stack
            }:e
        }
        if(err!==undefined)
            session.send({
                error:err
            })
        else if(res!==undefined)
            session.send({
                value:res
            })
    }else if(doc.function=='pong'){
    }
}
export default connectionHandleMessage
