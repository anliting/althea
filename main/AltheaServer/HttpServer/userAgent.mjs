let browser=['chrome','firefox','opr']
function getVersion(userAgent,s){
    let m=userAgent.match(
        new RegExp(s+'/([0-9]*)')
    )
    return m&&+m[1]
}
function parseAs(userAgent){
    let b={}
    for(let c of browser)
        b[c]=getVersion(userAgent,c)
    return b
}
function parse(s){
    return parseAs(s.toLowerCase()||'')
}
let userAgent={
    parse,
}
export default userAgent
