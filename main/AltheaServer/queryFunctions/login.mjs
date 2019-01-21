export default async(opt,env)=>{
    opt instanceof Object&&
    typeof opt.usr=='string'&&
    typeof opt.pwd=='string'||0()
    let res=await env.althea.database.login(env,opt.usr,opt.pwd)
    if(res.stat==0)
        throw res.err
    if(res.stat==1)
        return null
    if('login' in env)
        env.login(res.id,res.pwd)
    return{id:res.id,pwd:res.pwd}
}
