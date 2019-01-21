async function makeCache(request,fetchPromise){
    let[
        res,
        cache,
    ]=await Promise.all([
        fetchPromise,
        caches.open('v0'),
    ])
    cache.put(request,res.clone())
    return res
}
export default makeCache
