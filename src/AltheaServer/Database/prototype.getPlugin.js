module.exports=getPlugin
function getPlugin(id){
    return this.query0(`
        select
            id,
            isactivated,
            name,
            git,
            version,
            versionname,
            data
        from plugin
        where ?
    `,{id})
}
