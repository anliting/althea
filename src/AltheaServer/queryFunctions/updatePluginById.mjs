export default async(opt,env)=>{
    let cu=env.currentUser
    opt instanceof Object&&
    typeof opt.id=='number'&&
    opt.type=='isactivated'&&
    typeof opt.content=='number'&&
    cu.isadmin||0()
    await env.althea.database.updatePlugin(
        opt.id,opt.type,opt.content
    )
    return null
}
