export default async(opt,env)=>{
    opt instanceof Object&&
    typeof opt.id=='number'&&
    env.currentUser.isadmin||0()
    await env.althea.database.deleteUser(opt.id)
    return null
}
