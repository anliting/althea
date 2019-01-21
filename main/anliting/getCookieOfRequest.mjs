import{parseAsCookieString}from'rfc6265'
function getCookieOfRequest(request){
    return request.headers.cookie?
        parseAsCookieString(request.headers.cookie)
    :
        {}
}
export default getCookieOfRequest
