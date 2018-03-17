let responseerror=require('./responseerror')
module.exports=env=>{
    env.statuscode=403
    return responseerror(env)
}
