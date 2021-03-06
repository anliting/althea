import fs from              'fs'
import git from             'simple-git'
import updateDatabase from  './loadPlugins/updateDatabase.mjs'
function loadPlugins(althea,plugins){
    function AltheaForPlugin(pluginId){
        this._pluginId=pluginId
    }
    AltheaForPlugin.prototype={
        database:althea.database,
        addPagemodule(k,v){
            althea.addPagemodule(k,v)
        },
        addQueryFunction(k,v){
            althea.addQueryFunction(k,v)
        },
        cutPagemodule(k){
            althea.cutPagemodule(k)
        },
        cutClientModules(){
            delete althea.clientPluginModules[this._pluginId]
        },
        getPlugin(m){
            return althea._getActivatedPluginByModule(m)
        },
        async getData(){
            return(
                await althea.database.getPlugin(this._pluginId)
            )[0].data
        },
        setClientModules(v){
            althea.clientPluginModules[this._pluginId]=v
        },
        async setData(v){
            if(typeof v=='object')
                v=JSON.stringify(v)
            await althea.database.updatePlugin(this._pluginId,'data',v)
        },
        updateDatabase,
    }
    return Promise.all(plugins.map(async p=>{
        try{
            let path=`${althea.config.pathToPlugins}/${p.name}`
            if(!p.isactivated)
                return
            if(await fileExist(path)){
                try{
                    await new Promise(rs=>git(path).pull(rs))
                }catch(e){
                }
            }else
                await new Promise(rs=>git().clone(p.git,path,rs))
            {
                let
                    wd=process.cwd(),
                    modulePath=`${wd}${wd!='/'?'/':''}${path}/server.mjs`
                if(await fileExist(modulePath))
                    new(await import(modulePath)).default(
                        new AltheaForPlugin(p.id)
                    )
            }
        }catch(e){
            e.message+=`
loadPlugins():
    plugin: ${p.name}
`
            throw e
        }
    }))
}
async function fileExist(path){
    try{
        await fs.promises.stat(path)
    }catch(e){
        if(e.code=='ENOENT')
            return false
        throw e
    }
    return true
}
export default loadPlugins
