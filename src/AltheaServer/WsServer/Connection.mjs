import connectionHandleMessage from'./Connection/handleMessage'
function Connection(
    althea,
    wsConnection,
    environmentvariables,
    currentUserPromise
){
    this.althea=althea
    this.config=althea.config
    this.wsConnection=wsConnection
    this.environmentvariables=environmentvariables
    this._currentUserPromise=currentUserPromise
    this.wsConnection.on('message',connectionHandleMessage.bind(this))
    this._sessions={}
}
Connection.prototype.ping=async function(){
    this._send({function:'ping'})
}
Connection.prototype._send=function(val){
    this.wsConnection.send(JSON.stringify(val),e=>{
        if(e){
            if(
                e.code=='EPIPE'||
                e.message=='not opened'
            )
                return
            console.error('Connection.mjs:',e)
            throw e
        }
    })
}
Connection.prototype.login=function(id,pwd){
    this._currentUserPromise=this.althea.database.getCurrentUser(id,pwd)
}
Object.defineProperty(Connection.prototype,'logout',{get(){
    this._currentUserPromise=this.althea.database.getUser(
        this.althea.database.constants.user.id.anonymous
    )
}})
export default Connection
