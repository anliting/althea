import docTrans from            './Site/docTrans.js'
import post from                './Site/prototype.post.js'
import send from                './Site/prototype.send.js'
import loadUserProperties from  './Site/loadUserProperties.js'
import EventEmmiter from        '../_lib/EventEmmiter/main/EventEmmiter.mjs'
function Site(){
    EventEmmiter.call(this)
    // start caches
    this._users={}
    // end caches
    this._sessions={}
    this._sendingPortNumber=0
    this._onMessage={}
    this._sharedWorkerPort=window.SharedWorker?
        (new SharedWorker('%23sharedWorker')).port
    :
        // for chrome
        new Worker('sharedWorkerForChromeMobile.static.js')
    this._sharedWorkerPort.onmessage=e=>{
        let doc=e.data
        if(doc=='userChange'){
            this.emit('userChange')
        }else if(doc.function=='statusChange'){
            this.status=doc.status
            this.emit('statusChange')
        }else{
            if(doc.port in this._onMessage){
                this._onMessage[doc.port](doc)
                delete this._onMessage[doc.port]
            }else if(doc.port in this._sessions){
                this._sessions[doc.port].onMessage(doc)
            }
        }
    }
    this.status='offline'
    this._Session=Session
    function Session(port){
        this._port=port
    }
    Session.prototype._site=this
    Session.prototype.send=function(doc){
        doc=docTrans(doc)
        doc.port=this._port
        this._site._sharedWorkerPort.postMessage(doc)
    }
    Session.prototype.end=function(){
        this._site._sharedWorkerPort.postMessage({
            function:'unregisterPort',
            port:this._port,
        })
    }
}
Object.setPrototypeOf(Site.prototype,EventEmmiter.prototype)
Site.prototype.applyPlugins=async function(name,arg){
    return Promise.all((await this.loadPlugins(name)).map(f=>f(arg)))
}
Site.prototype.loadPlugins=async function(name){
    return Promise.all((
        await this.send({function:'getPluginScripts',module:name,})
    ).map(async s=>
        (await import(s)).default
    ))
}
Site.prototype.path={
    register:'user',
}
Site.prototype.post=post
Site.prototype.send=send
Site.prototype.createSession=function(){
    let id=this._sendingPortNumber++
    this._sharedWorkerPort.postMessage({
        function:'registerPort',
        port:id,
    })
    let session=new this._Session(id)
    return this._sessions[id]=session
}
loadUserProperties(Site.prototype)
export default Site
