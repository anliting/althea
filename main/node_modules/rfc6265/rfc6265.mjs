function isCookieString(s){
    return/^[\x21\x23-\x27\x2a-\x2b\x2d-\x2e\x30-\x39\x41-\x5b\x5e-\x7a\x7c\x7e]+=(?:[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*|"[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*")(?:; [\x21\x23-\x27\x2a-\x2b\x2d-\x2e\x30-\x39\x41-\x5b\x5e-\x7a\x7c\x7e]+=(?:[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*|"[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*"))*$/.test(s)
}
function parseCookieString(s){
    let p={}
    s.split('; ').forEach(s=>{
        let[m,k,v0,v1]=s.match(/([^=]+)=(?:([^"]*)|"([^"]*)")$/)
        ;(p[k]=p[k]||[]).push(v0||v1)
    })
    return p
}
function parseAsCookieString(s){
    if(!isCookieString(s))
        throw Object.assign(
            Error('Target string cannot be parsed as cookie string.'),
            {key:'notCookieString'}
        )
    return parseCookieString(s)
}
export{
    isCookieString,
    parseAsCookieString,
    parseCookieString,
}
export default{
    isCookieString,
    parseAsCookieString,
    parseCookieString,
}
