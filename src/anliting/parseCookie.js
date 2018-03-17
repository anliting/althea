function parseCookie(s){
    let res={}
    s.split(';').forEach(s=>{
        let[m,k,v]=s.match(/^(.*)=(.*)$/)
        res[k.trim()]=decodeURIComponent(v)
    })
    return res
}
module.exports=parseCookie
