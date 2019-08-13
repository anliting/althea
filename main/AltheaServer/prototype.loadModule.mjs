function loadModule(main,args,options={}){
    return`<script>
(()=>{
    ${options.sharedWorker?`
        window._althea={
            preventGC:[window.SharedWorker?
                (new SharedWorker('#23sharedWorker')).port
            :window.Worker?
                new Worker('#23sharedWorkerForChromeMobile')
            :'']
        }
    `:''}
    document.currentScript.parentNode.removeChild(document.currentScript)
    ${args?`window.arg=JSON.parse(decodeURIComponent("${
        encodeURIComponent(JSON.stringify(args))
    }"))`:''}
    document.body.appendChild(
        Object.assign(document.createElement('script'),{
            type:'module',
            src:'${main}',
            onload(){
                document.body.removeChild(this)
            }
        })
    )
    ${options.preloadModule?
        `eval(${JSON.stringify(
            `window.altheaDontGarbageCollect=Promise.all(${
                JSON.stringify(options.preloadModule)
            }.map(v=>import(v)))`
        )})`
    :''}
})()
</script>
`
}
export default loadModule
