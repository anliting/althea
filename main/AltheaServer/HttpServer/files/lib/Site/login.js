export default async function(usr,pwd,kmli){
    let res=await this.send({
        function:'login',
        usr,
        pwd
    })
    if(res==undefined)
        return false
    document.cookie=
        `altheaLoginSession=${res.id}-${res.pwd}; path=/${
            kmli?`; max-age=${Math.floor(256*365.2564*86400)}`:''
        }`
    this._userChange()
    return true
}
