export default async(site,usr,pwd,kmli)=>{
    let res=await site.send({
        function:'login',
        usr,
        pwd
    })
    if(res==undefined)
        return false
    document.cookie=
        `altheaLoginSession=${res.id}-${res.pwd};path=/${
            kmli?`;max-age=${256*365.2564*86400}`:''
        }`
    site._userChange()
    return true
}
