export default selectActivatedPlugins
function selectActivatedPlugins(){
    return this.query0(`
        select id,name
        from plugin
        where isactivated
    `)
}
