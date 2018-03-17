let
    getCookieOfRequest=require('../../../anliting/getCookieOfRequest'),
    type=              require('../../../anliting/type')
module.exports=getCurrentUserByRequest
function getCurrentUserByRequest(req){
    let loginSession
    if((()=>{
        let cookie=getCookieOfRequest(req)
        if(!('altheaLoginSession' in cookie))
            return 1
        loginSession=cookie.altheaLoginSession.split('-')
        if(
            loginSession.length!=2||
            !type.stringIsInteger(loginSession[0])
        )
            return 1
    })())
        return this.getUser(this.constants.user.id.anonymous)
    return this.getCurrentUser(
        +loginSession[0],
        loginSession[1]
    ).catch(rsn=>{
        if(rsn.errno==1)
            return this.getUser(this.constants.user.id.anonymous)
        throw rsn
    })
}
