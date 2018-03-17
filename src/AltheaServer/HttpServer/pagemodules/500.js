let responseerror=require('./responseerror')
module.exports=env=>{
    env.statuscode=500
    return responseerror(env)
}
