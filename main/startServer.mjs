import calcTime from        './anliting/calcTime.mjs'
import readConfig from      './readConfig.mjs'
import AltheaServer from    './AltheaServer.mjs'
import url from             'url'
import path from            'path'
let options={
    printTime:false,
    dataDirectory:'.',
}
let stack=[]
for(let v of process.argv.slice(2)){
    switch(v){
        case'd':
            stack.push('dataDirectory')
            break
        case't':
            options.printTime=true
            break
        default:
            if(stack[stack.length-1]=='dataDirectory'){
                options.dataDirectory=v
                stack.pop()
            }
            break
    }
}
!options.printTime?
    main()
:
    calcTime(main).then(console.log)
function main(){
    let
        server=new AltheaServer(
            path.dirname((new url.URL(import.meta.url)).pathname),
            options.dataDirectory,
            readConfig(`${options.dataDirectory}/config`),
            readConfig(`${options.dataDirectory}/dbconfig`)
        ),
        endPromise,
        end=()=>endPromise=endPromise||(async()=>{
            await server.end()
            process.exit()
        })()
    process.on('SIGINT',end)
    process.on('SIGTERM',end)
    return server.load
}
