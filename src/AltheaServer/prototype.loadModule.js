function loadModule(main,args,options={}){
    let
        // chrome need 61<= for ES2015 modules
        chromeVersion=61,
        // firefox is waiting for ES2015 modules
        firefoxVersion=Infinity,
        // opera need 48<= for ES2015 modules
        operaVersion=48
    return`<script>
!function(){
    ${options.sharedWorker?`
        if(window.SharedWorker)
            (new SharedWorker('sharedWorker.static.js')).port
        else if(window.Worker)
            new Worker('sharedWorkerForChromeMobile.static.js')
    `:''}
    var
        overrideBS=     calcOverrideBS()
    if(overrideBS==undefined?
        !(
            ${chromeVersion}<=       getVersion('chrome')    ||
            ${firefoxVersion}<=      getVersion('firefox')   ||
            ${operaVersion}<=        getVersion('opr')
        )
    :
        !overrideBS
    )
        return setTimeout(notSupports)
    document.currentScript.parentNode.removeChild(document.currentScript)
    var script=document.createElement('script')
    script.type='module'
    script.src="${main}"
    ${args?`window.arg=JSON.parse(decodeURIComponent("${
        encodeURIComponent(JSON.stringify(args))
    }"))`:''}
    script.onload=function(){
        if(script.parentNode)
            document.body.removeChild(script)
    }
    document.body.appendChild(script)
    ${options.preloadModule?`window.altheaDontGarbageCollect=Promise.all(${
        JSON.stringify(options.preloadModule)
    }.map(v=>import(v)))`:''}
    function calcOverrideBS(){
        if(!localStorage.althea)
            return
        let res
        String(localStorage.althea).split(' ').map(p=>{
            if(p=='!bs')
                res=false
            else if(p=='bs')
                res=true
        })
        return res
    }
    function getVersion(s){
        let m=navigator.userAgent.toLowerCase().match(
            new RegExp(s+'/([0-9]*)')
        )
        return m&&+m[1]
    }
    function notSupports(){
        document.title='User Agent Does Not Support'
        document.body.innerHTML=${JSON.stringify(
`<h1>User Agent Does Not Support</h1>
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
        )}
    }
}()
</script>
`
}
module.exports=loadModule
