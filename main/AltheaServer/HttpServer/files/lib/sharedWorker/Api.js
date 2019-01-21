import Connection from './Connection.js'
function Api(){
    this.status='offline'
    this._nextSessionPort=0
    this._sessions=[]
    this._onMessage={}
    apiCreateConnection.call(this)
    this._Session=apiCreateSessionConstructor.call(this)
}
Api.prototype.send=function(doc){
    if(!('port' in doc)){
        doc.port=this._nextSessionPort++
        this._connection.send([doc.port,doc.function,doc.arguments])
        return new Promise((rs,rj)=>
            this._onMessage[doc.port]=(err,res)=>
                err?rj(err):rs(res)
        )
    }else{
        this._connection.send([doc.port,doc.function,doc.arguments])
    }
}
Api.prototype.createSession=function(){
    let port=this._nextSessionPort++
    let session=new this._Session(port)
    this._sessions.push(session)
    this._onMessage[port]=(err,res)=>
        session.onMessage(err,res)
    return session
}
function apiChangeStatus(status){
    this.status=status
    this.onStatusChange&&this.onStatusChange()
}
function apiCreateConnection(){
    let c=new Connection
    c.onClose=_=>{
        delete this._connection
        c.onClose=c.onOpen=null
        apiChangeStatus.call(this,'offline')
        apiCreateConnection.call(this)
    }
    c.onOpen=_=>{
        apiChangeStatus.call(this,'online')
    }
    c.onMessage=doc=>
        this._onMessage[doc.port](doc.error,doc.value)
    this._connection=c
}
function apiCreateSessionConstructor(){
    function Session(id){
        this._id=id
    }
    Session.prototype._api=this
    Session.prototype.send=function(doc){
        doc.port=this._id
        this._api.send(doc)
    }
    return Session
}
export default Api
