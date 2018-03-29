import ws from          'ws'
import Connection from  './WsServer/Connection'
function WsServer(althea){
    this._althea=althea
    this.rawWsServer=
        new ws.Server({server:this._althea.httpServer.rawHttpServer})
    this.alive=new WeakMap
    setInterval(()=>{
        this.rawWsServer.clients.forEach(cn=>{
            if(!this.alive.get(cn))
                return cn.terminate()
            this.alive.set(cn,0)
            cn.ping()
        })
    },60e3)
    this.load=(async()=>{
        let envVars=await this._althea.envVars
        this.rawWsServer.on('connection',(cn,req)=>
            this._handleConnection(cn,req,envVars)
        )
    })()
}
WsServer.prototype._handleConnection=function(cn,req,envVars){
    if(!this._althea.allowOrigin(envVars,req.headers.origin))
        return cn.terminate()
    cn.setMaxListeners(0)
    this.alive.set(cn,1)
    cn.on('pong',()=>{
        this.alive.set(cn,1)
    })
    cn.on('error',e=>{
        if(
            e.code=='ECONNRESET'||
            e.code=='EPIPE'
        )
            return
        throw e
    })
    new Connection(
        this._althea,
        cn,
        envVars,
        this._althea.database.getCurrentUserByRequest(req)
    )
}
export default WsServer
