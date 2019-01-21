import readConfig from  '../readConfig'
function fillMissingConfig(mainDir,config){
    let defaultConfig=readConfig(`${mainDir}/AltheaServer/defaultConfig`)
    for(let i in defaultConfig)
        if(!(i in config))
            config[i]=defaultConfig[i]
}
export default fillMissingConfig
