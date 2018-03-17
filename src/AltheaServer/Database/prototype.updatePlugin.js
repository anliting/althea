module.exports=updatePlugin
function updatePlugin(id,type,content){
    let options_query=[
        {},
        {id},
    ]
    options_query[0][type]=content
    return this.query(`
        update plugin
        set ?
        where ?
    `,options_query)
}
