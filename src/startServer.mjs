import calcTime from        './anliting/calcTime'
import readConfig from      './readConfig'
import AltheaServer from    './AltheaServer'
let options={
    printTime:false,
}
process.argv.slice(2).map(v=>
    v=='t'&&(options.printTime=true)
)
!options.printTime?
    main()
:
    calcTime(main).then(console.log)
function main(){
    return(new AltheaServer(
        readConfig('config'),
        readConfig('dbconfig')
    )).load
}
