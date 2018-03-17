let
    Session=    require('./getSession/Session')
module.exports=getSession
async function getSession(id){
    let row=(await this.query0(`
        select
            id,
            id_user,
            password
        from loginSession
        where
            ?
    `,{id}))[0]
    if(row==undefined){
        let e=RangeError(`*id* is not a session's id.`)
        e.name='notFound'
        throw e
    }
    return new Session(
        this,
        row.id,
        row.id_user,
        row.password
    )
}
