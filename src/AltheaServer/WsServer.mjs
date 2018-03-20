import ws from          'ws'
import Connection from  './WsServer/Connection'
function WsServer(althea){
    this._althea=althea
    this.rawWsServer=
        new ws.Server({server:this._althea.httpServer.rawHttpServer})
    this.load=(async()=>{
        let envVars=await this._althea.envVars
        this.rawWsServer.on('connection',(cn,req)=>
            this.handleConnection(cn,req,envVars)
        )
    })()
}
WsServer.prototype.handleConnection=function(cn,req,envVars){
    if(!this._althea.allowOrigin(envVars,req.headers.origin))
        return cn.terminate()
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
