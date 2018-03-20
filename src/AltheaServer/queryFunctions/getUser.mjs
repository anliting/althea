import type from    '../../anliting/type'
export default async(opt,env)=>{
    opt instanceof Object&&
    typeof opt.id=='number'&&
    type.isArray(type.isStringValue)(opt.columns)||0()
    let cu=env.currentUser
    let u=await env.althea.database.getUser(opt.id)
    let res={}
    if(0<=opt.columns.indexOf('username'))
        res.username=u.username
    if(0<=opt.columns.indexOf('nickname'))
        res.nickname=u.nickname
    if(cu.id==u.id){
        if(0<=opt.columns.indexOf('isadmin'))
            res.isadmin=u.isadmin
        if(0<=opt.columns.indexOf('isAnonymous'))
            res.isAnonymous=u.isAnonymous
    }
    return res
}
