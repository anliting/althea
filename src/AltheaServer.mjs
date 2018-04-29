import fsPromises from          'fs/promises'
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
    this.config=config
    fillMissingConfig(this.config)
    this.clientPluginModules={}
    this.database=          new Database(dbconfig)
    this.envVars=           getEnvironmentVariables(this)
    this.queryFunctions=    Object.create(queryFunctions)
    this.load=createLoad.call(this)
}
AltheaServer.prototype.end=async function(){
    await this.wsServer.end()
    await this.httpServer.end()
    await this.database.end()
}
AltheaServer.prototype.lib={
    anliting:{type}
}
AltheaServer.prototype.ensureDirectory=function(path){
    return fsPromises.mkdir(path).catch(e=>{
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
