module.exports=async function(opt,env){
    opt instanceof Object&&
    typeof opt.module=='string'||0()
    let rows=await env.althea.database.selectActivatedPlugins()
    let res=rows.map(row=>({
        id:row.id,
        val:loadModule(env,row.id,row.name,opt.module)
    }))
    let result={}
    for(let e of res)
        result[e.id]=e.val
    return result
}
function loadModule(env,id,name,module){
    if(
        id in env.althea.clientPluginModules&&
        module in env.althea.clientPluginModules[id]
    )
        return `/plugins/${name}/${
            env.althea.clientPluginModules[id][module]
        }`
    return''
}
