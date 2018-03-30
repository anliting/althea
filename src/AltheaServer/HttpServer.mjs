import fs from              'fs'
import EventEmmiter from    'events'
import http from            'http'
import http2 from           'http2'
import pagemodules from     './HttpServer/pagemodules'
import _handleRequest from  './HttpServer/prototype._handleRequest'
function HttpServer(althea){
    EventEmmiter.call(this)
    this.althea=althea
    this.pagemodules=Object.create(pagemodules)
    this.plugins=[]
    if(!this.althea.config.tls){
        this.rawHttpServer=http.createServer()
    }else{
        this.rawHttpServer=http2.createServer({
            key:    fs.readFileSync(this.althea.config.tls.key),
            cert:   fs.readFileSync(this.althea.config.tls.cert),
        })
    }
    this.load=Promise.all([
        althea.config.pathToUpload!=undefined&&
            althea.ensureDirectory(althea.config.pathToUpload),
        althea.ensureDirectory(althea.config.pathToUsersFiles),
        (async()=>{
            let envVars=await althea.envVars
            this.rawHttpServer.on('request',(req,res)=>{
                this._handleRequest(envVars,req,res).catch(err=>
                    this.emit('error',err)
                )
            })
            this.rawHttpServer.setTimeout(24*60*60*1000)
        })()
    ])
}
Object.setPrototypeOf(HttpServer.prototype,EventEmmiter.prototype)
HttpServer.prototype._handleRequest=_handleRequest
HttpServer.prototype.addPagemodule=function(k,v){
    if(typeof k=='function')
        this.plugins.push({test:k,module:v})
    else if(typeof k=='string')
        this.pagemodules[k]=v
}
HttpServer.prototype.end=function(){
    this.rawHttpServer.close()
}
Object.defineProperty(HttpServer.prototype,'listen',{get(){
    this.rawHttpServer.listen(
        this.althea.config.port,
        this.althea.config.hostname
    )
}})
export default HttpServer
