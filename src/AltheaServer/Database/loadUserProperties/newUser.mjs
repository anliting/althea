async function newUser(username){
    let res=await this.query0(`
        insert into user
        set ?
    `,{
        username
    })
    return res.insertId
}
export default async function(username,password){
    try{
        let id=await newUser.call(this,username)
        let user=await this.getUser(id)
        return await user.set({password})
    }catch(err){
        if(err.errno==1062){
            let e=Error('Username is used.')
            e.name='usernameIsUsed'
            throw e
        }
        throw err
    }
}
