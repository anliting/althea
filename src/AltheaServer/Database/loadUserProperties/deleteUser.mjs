export default async function(id){
    if(!(
        Number.isInteger(id)&&0<id
    ))
        throw RangeError(`*id* is not a positive integer.`)
    return this.query(`
        delete from user
        where ?
    `,[
        {id},
    ])
}
