import post from './api/post'
export default env=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='POST')
        return post(env)
    env.headers.allow='POST'
    return{
        status:405,
        headers:env.headers,
    }
}
