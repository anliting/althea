let responseerror=require('./responseerror')
module.exports=env=>{
    env.statuscode=400
    return responseerror(env)
}
