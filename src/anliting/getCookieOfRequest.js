let{parseCookieString}=require('./rfc6265')
module.exports=getCookieOfRequest
function getCookieOfRequest(request){
    return request.headers.cookie?
        parseCookieString(request.headers.cookie)
    :
        {}
}
