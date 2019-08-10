export default async(opt,env)=>{
    opt instanceof Object&&
    typeof opt.username=='string'&&
    opt.username.match(/^[0-9a-z]{1,16}$/)&&
    typeof opt.password=='string'||0()
    try{
        await env.althea.database.newUser(
            opt.username,opt.password
        )
        return 0
    }catch(e){
console.log(e)
        if(e.name=='usernameIsUsed')
            return 1
        throw e
    }
}
