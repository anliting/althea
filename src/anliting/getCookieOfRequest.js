let{parseAsCookieString}=require('rfc6265')
module.exports=getCookieOfRequest
function getCookieOfRequest(request){
    return request.headers.cookie?
        parseAsCookieString(request.headers.cookie)
    :
        {}
}
