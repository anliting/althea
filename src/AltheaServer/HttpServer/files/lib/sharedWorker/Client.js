import Api from './Api.js'
function Client(){
    this._api=new Api
    this._api.onStatusChange=_=>
        this._broadcast({
            function:'statusChange',
            status:this._api.status,
        })
    this._ports=new Map
}
Client.prototype._broadcast=function(doc){
    for(let port of this._ports.keys())
        port.postMessage(doc)
}
Client.prototype._getCurrentUser=function(){
    if(this._getCurrentUser_)
        return this._getCurrentUser_
    this._getCurrentUser_=this._api.send({
        function:'getCurrentUser',
        arguments:{}
    })
    return this._getCurrentUser_
}
Client.prototype._userChange=function(){
    delete this._getCurrentUser_
    this._broadcast('userChange')
}
Client.prototype._handleMessage=function(port,doc){
    let send=doc=>{
        let portMap=this._ports.get(port)
        if(doc.port in portMap.tabSessionPortToServerSession){
            let session=
                portMap.tabSessionPortToServerSession[doc.port]
            session.send(doc)
        }else{
            let portNumber=doc.port
            delete doc.port
            responseWith(portNumber,this._api.send(doc))
        }
    }
    if(doc.function=='registerPort'){
        let
            portMap=this._ports.get(port),
            serverSession=this._api.createSession()
        serverSession.onMessage=(err,res)=>{
            let d={
                port:doc.port,
            }
            if(err!=undefined)
                d.error=err
            else
                d.value=res
            port.postMessage(d)
        }
        portMap.tabSessionPortToServerSession[doc.port]=
            serverSession
        portMap.serverSessionToTabSessionPort.set(
            serverSession,
            doc.port
        )
    }else if(doc.function=='unregisterPort'){
        let
            portMap=this._ports.get(port),
            serverSession=
                portMap.tabSessionPortToServerSession[doc.port]
        delete portMap.tabSessionPortToServerSession[doc.port]
        portMap.serverSessionToTabSessionPort.delete(serverSession)
    }else if(doc.function=='getCurrentUser')
        responseWith(doc.port,this._getCurrentUser())
    else if(doc.function=='send')
        send(doc.arguments.doc)
    else if(doc.function=='userChange')
        this._userChange()
    else
        send(doc)
    async function responseWith(portNumber,val){
        let d={
            port:portNumber,
        }
        try{
            d.value=await val
        }catch(e){
            d.error=e
        }
        port.postMessage(d)
    }
}
Client.prototype.register=function(port){
    port.onmessage=e=>this._handleMessage(port,e.data)
    this._ports.set(port,{
        tabSessionPortToServerSession:{},
        serverSessionToTabSessionPort:new Map,
    })
    port.postMessage({
        function:'statusChange',
        status:this._api.status,
    })
}
export default Client
