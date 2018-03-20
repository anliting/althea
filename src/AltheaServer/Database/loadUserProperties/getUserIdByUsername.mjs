async function getUserIdByUserName(username){
/*
    errno:
        0: error
        1: no such user
*/
    let rows
    try{
        rows=await this.query0(`
            select id
            from user
            where ?
        `,{username})
    }catch(e){
        throw {errno:0,err:e}
    }
    if(rows.length==0)
        throw {errno:1}
    return rows[0].id
}
export default getUserIdByUserName
