let
    Database=           require('./AltheaServer/Database'),
    HttpServer=         require('./AltheaServer/HttpServer'),
    WsServer=           require('./AltheaServer/WsServer'),
    fillMissingConfig=  require('./AltheaServer/fillMissingConfig'),
    getEnvironmentVariables=
        require('./AltheaServer/getEnvironmentVariables'),
    queryFunctions=     require('./AltheaServer/queryFunctions')
module.exports=AltheaServer
function AltheaServer(config,dbconfig){
    this.config=config
    fillMissingConfig(this.config)
    this.clientPluginModules={}
    this.database=          new Database(dbconfig)
    this.envVars=           getEnvironmentVariables(this)
    this.queryFunctions=    Object.create(queryFunctions)
    this.load=createLoad.call(this)
}
let
    fs=                 require('mz/fs')
AltheaServer.prototype.lib={
    anliting:{
        type:require('./anliting/type')
    }
}
AltheaServer.prototype.ensureDirectory=function(path){
    return fs.mkdir(path).catch(e=>{
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
AltheaServer.prototype.loadPlugins=
    require('./AltheaServer/prototype.loadPlugins')
AltheaServer.prototype.loadModule=
    require('./AltheaServer/prototype.loadModule')
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
