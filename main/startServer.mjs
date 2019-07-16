import calcTime from        './anliting/calcTime.mjs'
import readConfig from      './readConfig.mjs'
import AltheaServer from    './AltheaServer.mjs'
let options={
    printTime:false,
}
for(let v of process.argv.slice(2))switch(v){
    case't':
        options.printTime=true
        break
}
;(async()=>{
    let t=await calcTime(()=>{
        let
            server=new AltheaServer(
                '.',
                readConfig('config'),
                readConfig('dbconfig')
            ),
            end=()=>{
                process.off('SIGINT',end).off('SIGTERM',end)
                ;(async()=>{
                    await server.end()
                    // should not need this
                    process.exit()
                })()
            }
        process.on('SIGINT',end).on('SIGTERM',end)
        return server.load
    })
    if(options.printTime)
        console.log(`${t}s`)
})()

