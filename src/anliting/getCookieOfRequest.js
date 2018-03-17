let parseCookie=require('./parseCookie')
module.exports=getCookieOfRequest
function getCookieOfRequest(request){
    return request.headers.cookie?
        parseCookie(request.headers.cookie)
    :
        {}
}
