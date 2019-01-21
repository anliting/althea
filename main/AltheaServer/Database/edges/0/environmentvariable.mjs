async function environmentvariable(db){
    await db.query(`
        create table environmentvariable (
            id int not null auto_increment,
            id_server int not null,
            \`key\` varchar(64) not null,
            value text not null,
            primary key (id)
        )
    `)
    await Promise.all([
        db.query(`
            insert into environmentvariable set
                id_server=0,
                \`key\`='version',
                value='1'
        `),
        db.query(`
            insert into environmentvariable set
                id_server=0,
                \`key\`='trustedOrigin',
                value='http://localhost'
        `),
    ])
}
export default environmentvariable
