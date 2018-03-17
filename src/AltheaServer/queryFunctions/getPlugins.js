module.exports=function(opt,env){
    env.currentUser.isadmin||0()
    return env.althea.database.getPlugins()
}
