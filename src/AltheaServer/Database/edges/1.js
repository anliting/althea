module.exports=async db=>{
    await Promise.all([
        db.query(`
            update plugin
            set data='{"databaseVersion":1}'
            where name='althea-blog'||name='althea-t'
        `),
    ])
    return 2
}
