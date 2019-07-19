export default async function(opt,env){
    opt instanceof Object&&
    typeof opt.module=='string'||0()
    return env.althea._getActivatedPluginByModule(opt.module)
}
