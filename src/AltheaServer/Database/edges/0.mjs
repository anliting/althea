import environmentvariable from     './0/environmentvariable'
import plugin from                  './0/plugin'
import user from                    './0/user'
import usermeta from                './0/usermeta'
export default async db=>{
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
