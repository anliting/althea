let
    environmentvariable=    require('./0/environmentvariable'),
    plugin=                 require('./0/plugin'),
    user=                   require('./0/user'),
    usermeta=               require('./0/usermeta')
module.exports=async db=>{
    await Promise.all([
        environmentvariable(db),
        db.query(`
            create table image (
                id int not null auto_increment,
                primary key (id)
            )
        `),
        db.query(`
            create table loginSession (
                id int not null auto_increment,
                id_user int not null,
                password binary(32) not null,
                lastBrowser varchar(64) not null,
                lastOs varchar(64) not null,
                primary key (id)
            )
        `),
        plugin(db),
        user(db),
        usermeta(db),
    ])
    return 2
}
