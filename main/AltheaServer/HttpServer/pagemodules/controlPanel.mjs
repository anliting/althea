function get(env){
    let userAgent=
        env.library.userAgent.parse(env.request.headers['user-agent'])
    let
        chromeVersion=61,
        firefoxVersion=60,
        operaVersion=48
    if(
        chromeVersion<=userAgent.chrome||
        firefoxVersion<=userAgent.firefox||
        operaVersion<=userAgent.opr
    ){
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
    }else
        return{
            status:400,
            headers:{
                'content-type':'text/html;charset=utf-8',
            },
            content:`<!doctype html>
<title>User Agent Does Not Support</title>
<meta name=viewport content='width=device-width,initial-scale=1'>
<h1>User Agent Does Not Support</h1>
<p>
You are seeing this because you are using a user agent which does not support browsing this site.
<p>
The list following by lists the user agents tested by the developers, and believed to support browsing this site:
<ul>
<li><a href=https://www.chromium.org/>Chromium</a> / <a href=https://www.google.com/chrome/>Google Chrome</a> ${chromeVersion}
<li><a href=https://www.mozilla.org/en-US/>Mozilla Firefox</a> ${firefoxVersion}
<li><a href=http://www.opera.com/>Opera</a> ${operaVersion}
</ul>
<p>
The developers are hard to test <a href=https://www.microsoft.com/en-us/windows/microsoft-edge>Microsoft Edge</a> and <a href=https://www.apple.com/safari/>Safari</a>, because they do not support <a href=https://www.gnu.org/>GNU/Linux</a>.
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
