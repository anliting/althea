export default(args,env)=>{
    env.currentUser.isadmin||0()
    return env.althea.database.getUsers()
}
