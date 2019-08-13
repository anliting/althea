let version={chrome:61,firefox:60,opera:48}
function get(env){
    let userAgent=
        env.library.userAgent.parse(env.request.headers['user-agent'])
    if(!(
        version.chrome<=userAgent.chrome||
        version.firefox<=userAgent.firefox||
        version.opera<=userAgent.opera
    ))
        return userAgent.notSupport(version)
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:`<!doctype html>
<title>Control Panel</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(
    //'lib/controlPanel.js'
    'lib/controlPanel.static.js'
)}
`
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
