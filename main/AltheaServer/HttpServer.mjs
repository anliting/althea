import fs from              'fs'
import EventEmmiter from    'events'
import http from            'http'
import http2 from           'http2'
import pagemodules from     './HttpServer/pagemodules.mjs'
import _handleRequest from  './HttpServer/prototype._handleRequest.mjs'
function HttpServer(althea){
    EventEmmiter.call(this)
    this._connection=new Set
    this.althea=althea
    this.pagemodules=Object.create(pagemodules)
    this.plugins=[]
    if(!this.althea.config.tls){
        this.rawHttpServer=http.createServer()
    }else{
        this.rawHttpServer=http2.createSecureServer({
            key:    fs.readFileSync(this.althea.config.tls.key),
            cert:   fs.readFileSync(this.althea.config.tls.cert),
        })
    }
    this.load=Promise.all([
        althea.config.pathToUpload!=undefined&&
            althea.ensureDirectory(`${althea.config.pathToUpload}`),
        althea.ensureDirectory(`${althea.config.pathToUsersFiles}`),
        (async()=>{
            let envVars=await althea.envVars
            this.rawHttpServer.on('connection',con=>{
                this._connection.add(con)
                con.on('close',()=>this._connection.delete(con))
            })
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
HttpServer.prototype.cutPagemodule=function(k){
    if(typeof k=='function')
        for(let i=0;i<this.plugins.length;i++)if(this.plugins[i].test==k)
            this.plugins.splice(i,1)
    else if(typeof k=='string')
        delete this.pagemodules[k]
}
HttpServer.prototype.end=function(){
    return new Promise((rs,rj)=>{
            this._connection.forEach(con=>con.destroy())
        this.rawHttpServer.close(err=>err?rj(err):rs())
    })
}
Object.defineProperty(HttpServer.prototype,'listen',{get(){
    this.rawHttpServer.listen(
        this.althea.config.port,
        this.althea.config.hostname
    )
}})
export default HttpServer
