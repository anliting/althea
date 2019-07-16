import{parseAsCookieString}from'@anliting/cookie'
function getCookieOfRequest(request){
    return request.headers.cookie?
        parseAsCookieString(request.headers.cookie)
    :
        {}
}
export default getCookieOfRequest
