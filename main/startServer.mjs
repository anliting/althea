import fs from              'fs'
import calcTime from        './anliting/calcTime.mjs'
import readConfig from      './readConfig.mjs'
import AltheaServer from    './AltheaServer.mjs'
async function existFile(p){
    try{
        await fs.promises.stat(p)
        return 1
    }catch(e){
        if(!(e.code=='ENOENT'))
            throw e
        return 0
    }
}
let options={
    printTime:false,
}
for(let v of process.argv.slice(2))switch(v){
    case't':
        options.printTime=true
        break
}
;(async()=>{
    let t=await calcTime(async()=>{
        let config={
            port:process.env.httpPort,
            wsPort:process.env.wsPort,
            trustOrigin:process.env.trustOrigin,
        }
        if(await existFile('wsTls'))
            config.wsTls={
                key:fs.readFileSync('wsTls/key'),
                cert:fs.readFileSync('wsTls/crt'),
            }
        let
            server=new AltheaServer(
                config,
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
