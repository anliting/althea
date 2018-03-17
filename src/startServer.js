let options={
    printTime:false,
}
process.argv.slice(2).map(v=>
    v=='t'&&(options.printTime=true)
)
let altheaServer
!options.printTime?
    main()
:
    require('./anliting/calcTime')(main).then(console.log)
function main(){
    let readConfig=require('./readConfig')
    return(altheaServer=new(require('./AltheaServer'))(
        readConfig('config'),
        readConfig('dbconfig')
    )).load
}
