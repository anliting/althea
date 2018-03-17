module.exports=async function(){
    if((await this.query0(`show tables`)).length==0)
        return 0
    return+(await this.query0(`
        select value
        from environmentvariable
        where \`key\`='version'
    `))[0].value
}
