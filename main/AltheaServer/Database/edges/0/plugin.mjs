import blog from './plugin/blog'
let list=[
    {
        isactivated:1,
        name:'defaultRoot',
        git:'https://github.com/anliting/althea-defaultRoot.git'
    },
    {
        isactivated:1,
        name:'anlitings-style',
        git:'https://github.com/anliting/althea-anlitings-style.git'
    },
    {
        isactivated:1,
        name:'user',
        git:'https://github.com/anliting/althea-user.git'
    },
    {
        isactivated:0,
        name:'jquery',
        git:'https://github.com/anliting/althea-jquery.git'
    },
    {
        isactivated:0,
        name:'mathjax',
        git:'https://github.com/anliting/althea-mathjax.git'
    },
    {
        isactivated:0,
        name:'materialIcon',
        git:'https://github.com/anliting/althea-materialIcon.git'
    },
    {
        isactivated:0,
        name:'anlitings-style-navigationbar',
        git:'https://github.com/anliting/althea-anlitings-style-navigationbar.git'
    },
    {
        isactivated:0,
        name:'htmleditor',
        git:'https://github.com/anliting/althea-htmleditor.git'
    },
    {
        isactivated:0,
        name:'t',
        git:'https://github.com/anliting/althea-t.git'
    },
    {
        isactivated:0,
        name:'anlitings-facebook',
        git:'https://github.com/anliting/althea-anlitings-facebook.git'
    },
    {
        isactivated:0,
        name:'anlitings-github',
        git:'https://github.com/anliting/althea-anlitings-github.git'
    },
    {
        isactivated:0,
        name:'watch',
        git:'https://github.com/anliting/althea-watch.git'
    },
    {
        isactivated:0,
        name:'sitemap',
        git:'https://github.com/anliting/althea-sitemap.git'
    },
    {
        isactivated:0,
        name:'portal',
        git:'https://github.com/anliting/althea-portal.git'
    },
    {
        isactivated:0,
        name:'loginPage',
        git:'https://github.com/anliting/althea-loginPage.git'
    },
    {
        isactivated:0,
        name:'home',
        git:'https://github.com/anliting/althea-home.git'
    },
    {
        isactivated:0,
        name:'test',
        git:'https://github.com/anliting/althea-test.git'
    },
    {
        isactivated:0,
        name:'chat',
        git:'https://github.com/anliting/althea-chat.git'
    },
    {
        isactivated:0,
        name:'sky',
        git:'https://github.com/anliting/althea-sky.git'
    },
    {
        isactivated:0,
        name:'ipa',
        git:'https://github.com/anliting/althea-ipa.git'
    },
    {
        isactivated:0,
        name:'ci',
        git:'https://github.com/anliting/althea-ci.git'
    },
    {
        isactivated:0,
        name:'swf',
        git:'https://github.com/anliting/althea-swf.git'
    },
    {
        isactivated:0,
        name:'graph',
        git:'https://github.com/anliting/althea-graph.git'
    },
    {
        isactivated:0,
        name:'robots',
        git:'https://github.com/anliting/althea-robots.git'
    },
    {
        isactivated:0,
        name:'catforest',
        git:'https://github.com/anliting/althea-catforest.git'
    },
    {
        isactivated:0,
        name:'anlitings-wd',
        git:'https://github.com/anliting/althea-anlitings-wd.git'
    },
    {
        isactivated:0,
        name:'game',
        git:'https://github.com/anliting/althea-game.git'
    },
].concat(blog)
async function plugin(db){
    await db.query(`
        create table plugin (
            id int not null auto_increment,
            isactivated bool not null,
            name varchar(128) not null,
            git varchar(2048) not null,
            version int not null,
            versionname varchar(32) not null,
            data text not null,
            primary key (id)
        )
    `)
    await Promise.all(list.map(p=>db.query(`
        insert into plugin
        set ?
    `,p)))
}
export default plugin
