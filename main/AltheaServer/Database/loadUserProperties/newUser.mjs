async function putUser(username){
    return(await this.query0(`
        insert into user
        set ?
    `,{
        username,
        password:Buffer.alloc(32),
        nickname:'',
    })).insertId
}
export default async function(username,password){
    let id
    try{
        id=await putUser.call(this,username)
    }catch(err){
        if(err.errno==1062){
            let e=Error('Username is used.')
            e.name='usernameIsUsed'
            throw e
        }
        throw err
    }
    return await(
        await this.getUser(id)
    ).set({password})
}
