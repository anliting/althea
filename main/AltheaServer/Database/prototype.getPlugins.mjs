function getPlugins(){
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
    `)
}
export default getPlugins
