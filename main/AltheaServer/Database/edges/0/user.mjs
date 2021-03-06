async function user(db){
    await db.query(`
        create table user (
            id int not null auto_increment,
            username varchar(64) not null,
            password binary(32) not null,
            nickname varchar(32) not null,
            primary key (id),
            unique key (username)
        )
    `)
    await Promise.all([
        root(db),
        db.query(`
            insert into user set
                ?
        `,{
            id:db.constants.user.id.anonymous,
            username:'anonymous',
            password:Buffer.alloc(32),
            nickname:'Anonymous',
        })
    ])
}
async function root(db){
    await db.query(`insert into user set ?`,{
        id:db.constants.user.id.root,
        username:'root',
        password:Buffer.alloc(32),
        nickname:'Root',
    })
    await(await db.getUser(db.constants.user.id.root)).set({
        password:''
    })
}
export default user
