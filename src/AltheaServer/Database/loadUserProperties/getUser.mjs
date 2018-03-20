import User from './User'
async function getUserData(db,id){
    return(await db.query0(`
        select
            username,
            nickname
        from user
        where ?
    `,{id}))[0]
}
function getUserMeta(db,id){
    return db.query0(`
        select
            \`key\`,
            value
        from usermeta
        where ?
    `,{
        id_user:id
    })
}
export default async function(id){
    if(!(
        Number.isFinite(id)
    ))
        return Promise.reject(RangeError(
            `*id* is not a finite Number value.`
        ))
    let vals=await Promise.all([
        getUserData(this,id),
        getUserMeta(this,id),
    ])
    let
        data=vals[0],
        meta={}
    if(data==undefined){
        let e=RangeError(`*id* is not an user's id.`)
        e.name='notFound'
        throw e
    }
    vals[1].map(e=>meta[e.key]=e.value)
    return new User(
        this,
        id,
        data.username,
        data.nickname,
        meta
    )
}
