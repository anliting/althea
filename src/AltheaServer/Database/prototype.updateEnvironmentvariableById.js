module.exports=async function(id,content){
    await this.query(`
        update environmentvariable
        set ?
        where ?
    `,[
        {value:content},
        {id},
    ])
    return true
}
