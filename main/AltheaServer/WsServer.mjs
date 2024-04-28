import https from       'https'
import ws,{WebSocketServer}from          'ws'
import Connection from  './WsServer/Connection.mjs'
function WsServer(althea){
    this._althea=althea
    if(this._althea.config.wsTls){
        let wssHttpsServer=https.createServer(
            this._althea.config.wsTls
        ).on('secureConnection',con=>{
            con.on('error',e=>{
                if([
                    'ECONNRESET',
                    'EPIPE',
                    'ERR_HTTP_REQUEST_TIMEOUT',
                    'ERR_SSL_WRONG_VERSION_NUMBER',
                    'ERR_SSL_APPLICATION_DATA_AFTER_CLOSE_NOTIFY',
                    'ETIMEDOUT',
                ].includes(e.code))
                    return
                console.error(e)
                console.trace()
            })
        })
        this.rawWsServer=new WebSocketServer({
            server:wssHttpsServer,
        })
        wssHttpsServer.listen(this._althea.config.wsPort)
    }else
        this.rawWsServer=
            new WebSocketServer({port:this._althea.config.wsPort})
    this.alive=new WeakMap
    this._interval=setInterval(()=>{
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
WsServer.prototype.end=function(){
    return new Promise((rs,rj)=>{
        clearInterval(this._interval)
        this.rawWsServer.close(err=>err?rj(err):rs())
    })
}
export default WsServer
