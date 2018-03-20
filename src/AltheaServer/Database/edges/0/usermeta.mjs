async function usermeta(db){
    await db.query(`
        create table usermeta (
            id int not null auto_increment,
            id_user int not null,
            \`key\` varchar(64) not null,
            value text not null,
            primary key (id)
        )
    `)
    await db.query(`
        insert into usermeta set
            id_user=?,
            \`key\`='isadmin',
            value='1'
    `,db.constants.user.id.root)
    await db.query(`
        insert into usermeta set
            id_user=?,
            \`key\`='isAnonymous',
            value='1'
    `,db.constants.user.id.anonymous)
}
export default usermeta
