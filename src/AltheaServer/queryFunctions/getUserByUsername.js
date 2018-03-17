module.exports=async(opt,env)=>{
    opt instanceof Object&&
    typeof opt.username=='string'||0()
    return await env.althea.database.getUserIdByUsername(
        opt.username
    ).catch(rsn=>{
        if(rsn.errno==1)
            return null
        throw rsn
    })
}
