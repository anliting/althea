import fs from                  'fs'
import Database from            './AltheaServer/Database'
import HttpServer from          './AltheaServer/HttpServer'
import WsServer from            './AltheaServer/WsServer'
import fillMissingConfig from   './AltheaServer/fillMissingConfig'
import getEnvironmentVariables from
    './AltheaServer/getEnvironmentVariables'
import queryFunctions from      './AltheaServer/queryFunctions'
import type from                './anliting/type'
import loadPlugins from         './AltheaServer/prototype.loadPlugins'
import loadModule from          './AltheaServer/prototype.loadModule'
function AltheaServer(config,dbconfig){
    this._status='start'
    this.config=config
    fillMissingConfig(this.config)
    this.clientPluginModules={}
    this.database=          new Database(dbconfig)
    this.envVars=           getEnvironmentVariables(this)
    this.queryFunctions=    Object.create(queryFunctions)
    this.load=createLoad.call(this)
}
AltheaServer.prototype.end=async function(){
    this._status='end'
    if(this.httpServer){
        await this.httpServer.end()
        await this.wsServer.end()
    }
    await this.database.end()
}
AltheaServer.prototype.lib={
    anliting:{type}
}
AltheaServer.prototype.ensureDirectory=function(path){
    return fs.promises.mkdir(path).catch(e=>{
        if(!(e.code=='EEXIST'))
            throw e
    })
}
AltheaServer.prototype.addPagemodule=function(k,v){
    this.httpServer.addPagemodule(k,v)
}
AltheaServer.prototype.addQueryFunction=function(k,v){
    this.queryFunctions[k]=v
}
AltheaServer.prototype.allowOrigin=function(envVars,origin){
    return origin==undefined||origin==envVars.trustedOrigin
}
AltheaServer.prototype.loadPlugins=loadPlugins
AltheaServer.prototype.loadModule=loadModule
async function createLoad(){
    await this.database.load
    if(althea._status=='end')
        return
    this.httpServer=    new HttpServer(this)
    this.wsServer=      new WsServer(this)
    this.httpServer.on('error',e=>{
        console.error(e)
        process.exit()
    })
    await Promise.all([
        this.envVars,
        this.httpServer.load,
        this.wsServer.load,
        this.loadPlugins(),
    ])
    await this.httpServer.listen
}
export default AltheaServer
