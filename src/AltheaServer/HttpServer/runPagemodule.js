let
    module_page500=     require('./pagemodules/500'),
    etag=               require('etag')
module.exports=async(pageModule,env)=>{
    let res=await f(env,pageModule)
    if(res==undefined)
        return
    if(typeof res=='number')
        res={status:res}
    else if(typeof res=='string')
        res={content:res}
    if(res.headers==undefined)
        res.headers={}
    if(res.content!=undefined){
        if(res.status==undefined)
            res.status=200
        res.headers.etag=etag(res.content)
        if(env.request.headers['if-none-match']==res.headers.etag){
            res.status=304
            delete res.headers.etag
        }
    }
    env.response.writeHead(res.status,res.headers)
    env.response.end(res.status==304?undefined:res.content)
}
async function f(env,pageModule){
    try{
        return await pageModule(env)
    }catch(err){
        console.error(err)
        return await module_page500(env)
    }
}
