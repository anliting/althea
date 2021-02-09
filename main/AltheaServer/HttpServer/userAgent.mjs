let browser={
    chrome:'chrome',
    edge:'edg',
    firefox:'firefox',
    opera:'opr',
}
function getVersion(userAgent,s){
    let m=userAgent.match(
        new RegExp(s+'/([0-9]*)')
    )
    return m&&+m[1]
}
function parseAs(userAgent){
    let a={}
    for(let b in browser)
        a[b]=getVersion(userAgent,browser[b])
    if(userAgent.includes('mac os x'))
        a.safari=getVersion(userAgent,'version')
    return a
}
function parse(s){
    return parseAs(s.toLowerCase()||'')
}
function notSupport(version){
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
<li><a href=https://www.chromium.org/>Chromium</a> / <a href=https://www.google.com/chrome/>Google Chrome</a> ${version.chrome}
<li><a href=https://www.mozilla.org/en-US/>Mozilla Firefox</a> ${version.firefox}
<li><a href=http://www.opera.com/>Opera</a> ${version.opera}
</ul>
<p>
The developers are hard to test <a href=https://www.apple.com/safari/>Safari</a>, because they do not support <a href=https://www.gnu.org/>GNU/Linux</a>.
`
    }
}
function leOr(a,b){
    for(let i in a)
        if(a[i]<=b[i])
            return 1
    return 0
}
let userAgent={
    notSupport,
    parse,
    version:{
        esModuleBase:{chrome:61,edge:16,firefox:60,opera:47,safari:11},
        esModuleDynamic:{chrome:63,edge:79,firefox:67,opera:50,safari:12},
    },
    leOr,
}
export default userAgent
