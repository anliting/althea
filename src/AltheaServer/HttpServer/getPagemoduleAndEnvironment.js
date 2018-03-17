let
    {URL}=                  require('url'),
    module_page400=         require('./pagemodules/400'),
    module_page403=         require('./pagemodules/403'),
    module_page404=         require('./pagemodules/404'),
    module_page405get=      require('./pagemodules/405get'),
    module_files=           require('./pagemodules/files'),
    checkIfIsFileRequest=
        require('./getPagemoduleAndEnvironment/checkIfIsFileRequest')
module.exports=getPagemoduleAndEnvironment
async function getPagemoduleAndEnvironment(httpServer,req,res,envVars){
    let
        {althea}=httpServer,
        env={
            httpServer,
            althea,
            config:althea.config,
            envVars,
            environmentvariables:envVars,
            database:althea.database,
            request:req,
            response:res,
            headers:{},
            date:new Date,
            analyze:{
                request:{
                }
            }
        }
    return{
        environment:env,
        module:await selectModule(env),
    }
}
async function selectModule(env){
    let parsedUrl
    try{
        parsedUrl=new URL(env.request.url,'a://a')
    }catch(e){
        return module_page400
    }
    env.analyze.request.parsedUrl=parsedUrl
    if(env.httpServer.pagemodules[parsedUrl.pathname])
        return env.httpServer.pagemodules[parsedUrl.pathname]
    let decodedPathname
    try{
        decodedPathname=decodeURIComponent(parsedUrl.pathname)
    }catch(e){
        return module_page400
    }
    for(let plugin of env.httpServer.plugins){
        let accepted=false
        if(typeof plugin.test=='function')
            accepted=await plugin.test(env)
        if(accepted)
            return plugin.module
    }
    let res=await checkIfIsFileRequest(env,decodedPathname)
    switch(res.status){
        case 0:
            throw res.err
        case 1:
            return module_page404
    }
    if(env.request.method!='GET')
        return module_page405get
    env.analyze.request.fileStat=res.fileStat
    switch(res.status){
        case 2:
            env.analyze.request.pathToFile=
                'althea/src/AltheaServer/HttpServer/files'+decodedPathname
            break
        case 3:
            env.analyze.request.pathToFile=
                env.config.pathToUsersFiles+decodedPathname
            break
        case 4:
            {
                let path=decodedPathname.split('/')
                env.analyze.request.pathToFile=`${
                    env.config.pathToPlugins
                }/${
                    path[2]
                }/files/${
                    path.slice(3).join('/')
                }`
            }
            break
    }
    return module_files
}
