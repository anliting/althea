let
    type=require('../../anliting/type')
module.exports=async(opt,env)=>{
    opt instanceof Object||0()
    let cu=env.currentUser
    if(!('id' in opt))
        opt.id=cu.id
    typeof opt.id=='number'&&
    typeof opt.set=='object'||0()
    try{
        let u=await env.althea.database.getUser(opt.id)
        if(!(
            0<u.id&&u.id==cu.id||cu.isadmin
        ))
            return
        let set={}
        if(typeof opt.set.nickname=='string')
            set.nickname=opt.set.nickname
        if(typeof opt.set.password=='string')
            set.password=opt.set.password
        if(typeof opt.set.username=='string')
            set.username=opt.set.username
        await u.set(set)
        return true
    }catch(e){
        if(e instanceof Error&&e.name=='notFound')
            return false
        throw e
    }
}
