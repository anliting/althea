let
    crypto      =require('crypto')
module.exports=async function(env,username,password){
    let userId=await getUserIdByUsernameAndPassword.call(
        this,
        username,
        password
    )
    if(userId==0)
        return{stat:1}
    try{
        let val=await registerLoginSession.call(this,env,userId)
        return{
            stat:2,
            id:val.id,
            pwd:val.password
        }
    }catch(err){
        return{stat:0,err}
    }
}
async function getUserIdByUsernameAndPassword(username,password){
    let rows=await this.query0(`
        select id from user where ? && (
            password=unhex(sha2(concat(id,?),256))
        )
    `,[
        {username},
        password,
    ])
    if(rows.length==0)
        return 0
    return rows[0].id
}
async function registerLoginSession(env,userId){
    let id=(await this.query0(`
        insert into loginSession set ?
    `,{
        id_user:userId
    })).insertId
    let password_session=ramdomPassword(env)
    await this.query(`
        update loginSession
        set password=unhex(sha2(concat(id,?),256))
        where ?
    `,[
        password_session,
        {id},
    ])
    return{id,password:password_session}
    function ramdomPassword(env){
        return crypto.randomBytes(
            Math.floor(env.config.safetyFactor/8)
        ).toString('hex')
    }
}
