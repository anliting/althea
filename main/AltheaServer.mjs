import fs from                  'fs'
import url from                 'url'
import path from                'path'
import Database from            './AltheaServer/Database.mjs'
import HttpServer from          './AltheaServer/HttpServer.mjs'
import WsServer from            './AltheaServer/WsServer.mjs'
import fillMissingConfig from   './AltheaServer/fillMissingConfig.mjs'
import getEnvironmentVariables from
    './AltheaServer/getEnvironmentVariables.mjs'
import queryFunctions from      './AltheaServer/queryFunctions.mjs'
import type from                './anliting/type.mjs'
import loadPlugins from         './AltheaServer/prototype.loadPlugins.mjs'
import loadModule from          './AltheaServer/prototype.loadModule.mjs'
function AltheaServer(config,dbconfig){
    this._mainDir=path.dirname((new url.URL(import.meta.url)).pathname)
    this._dataDir='.'
    if(typeof config.trustOrigin=='string')
        config.trustOrigin=[config.trustOrigin]
    this.config=config
    fillMissingConfig(this._mainDir,this.config)
    this.clientPluginModules={}
    this.database=          new Database(dbconfig)
    this.envVars=           getEnvironmentVariables(this)
    this.queryFunctions=    Object.create(queryFunctions)
    this.load=createLoad.call(this)
}
AltheaServer.prototype.end=async function(){
    await this.load
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
    return origin==undefined||
        this.config.trustOrigin.includes(origin)||
        origin==envVars.trustedOrigin
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
