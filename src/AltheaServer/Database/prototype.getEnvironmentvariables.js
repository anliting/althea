module.exports=function(){
    return this.query0(`
        select
            id,
            id_server,
            \`key\`,
            value
        from environmentvariable
    `)
}
