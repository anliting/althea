import fs from'fs'
let fsp=fs.promises
async function get(env){
    env.headers['content-type']='application/javascript'
    return{
        status:200,
        headers:env.headers,
        content:
`self._port=${env.althea.config.nextWsPort||env.althea.config.wsPort};${
    await fsp.readFile(`${
        env.althea._mainDir
    }/AltheaServer/HttpServer/files/sharedWorkerForChromeMobile.static.js`)
}`
    }
}
export default env=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method==='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
