async function newImage(){
    let r=await this.query0(`
        insert into \`image\` () values ()
    `)
    return r.insertId
}
export default newImage
