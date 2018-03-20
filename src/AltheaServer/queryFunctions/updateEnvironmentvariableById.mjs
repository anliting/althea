export default async(opt,env)=>{
    let cu=env.currentUser
    opt instanceof Object&&
    typeof opt.id=='number'&&
    typeof opt.content=='string'&&
    cu.isadmin||0()
    await env.althea.database.updateEnvironmentvariableById(
        opt.id,
        opt.content
    )
    return null
}
