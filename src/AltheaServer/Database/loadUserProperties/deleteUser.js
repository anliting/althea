module.exports=function(id){
    if(!(
        Number.isFinite(id)
    ))
        return Promise.reject(RangeError(
            `*id* is not a finite Number value.`
        ))
    return this.query(`
        delete from user
        where ?
    `,[
        {id},
    ])
}
