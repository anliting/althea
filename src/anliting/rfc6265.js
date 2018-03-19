function parseCookieString(s){
    let p={}
    s.split('; ').forEach(s=>{
        let[m,k,v0,v1]=s.match(/([^=]+)=(?:([^"]*)|"([^"]*)")$/)
        ;(p[k]=p[k]||[]).push(v0||v1)
    })
    return p
}
module.exports={parseCookieString}
