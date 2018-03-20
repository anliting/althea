import readConfig from  '../readConfig'
function fillMissingConfig(config){
    let defaultConfig=readConfig('althea/src/AltheaServer/defaultConfig')
    for(let i in defaultConfig)
        if(!(i in config))
            config[i]=defaultConfig[i]
}
export default fillMissingConfig
