module.exports=async function(ver){
    await this.query0(`
        update environmentvariable
        set value=?
        where \`key\`='version'
    `,ver)
}
