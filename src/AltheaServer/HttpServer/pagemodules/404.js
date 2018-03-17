let responseerror=require('./responseerror')
module.exports=env=>{
    env.statuscode=404
    return responseerror(env)
}
