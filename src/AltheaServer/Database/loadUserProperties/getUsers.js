module.exports=async function(){
    let rows=await this.query0(`
        select id
        from user
    `)
    return rows.map(row=>row.id)
}
