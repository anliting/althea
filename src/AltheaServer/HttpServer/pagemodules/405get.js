module.exports=env=>{
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
