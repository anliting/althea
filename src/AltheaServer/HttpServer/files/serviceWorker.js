import makeCache from './lib/serviceWorker/makeCache.js'
onfetch=async e=>{
    let parsedUrl=new URL(e.request.url)
    if(toPermanentlyCache(parsedUrl)){
        return e.respondWith((async()=>{
            let res=await caches.match(e.request)
            return res||fetchAndMakeCache(e.request)
        })())
    }
    if(toCacheIfOffline(parsedUrl)){
        return e.respondWith((async()=>{
            try{
                return await fetchAndMakeCache(e.request)
            }catch(err){
                return caches.match(e.request)
            }
        })())
    }
}
function toPermanentlyCache(parsedUrl){
    return 'anliting.com'==parsedUrl.host&&(
        /^\/img\//.test(parsedUrl.pathname)
    )||
    'cdn.rawgit.com'==parsedUrl.host||
    'gitcdn.link'==parsedUrl.host
}
function toCacheIfOffline(parsedUrl){
    return 'anliting.com'==parsedUrl.host&&(
        parsedUrl.pathname=='/test'||
        parsedUrl.pathname=='/t'||
        /^\/lib\//.test(parsedUrl.pathname)||
        /^\/chat\//.test(parsedUrl.pathname)
    )
}
async function fetchAndMakeCache(req){
    let fetchPromise=fetch(req)
    try{
        return await makeCache(req,fetchPromise)
    }catch(e){
        return fetchPromise
    }
}
