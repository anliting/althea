import { doe, html, Site } from '/lib/core.static.js';

function PluginsPage(site){
    this._site=site;
}
PluginsPage.prototype.initialize=function(){
    this.isInitialized=true;
    this.mainDiv=doe.div();
    this.load();
};
PluginsPage.prototype.load=async function(){
    log.call(this,await this._site.send('getPlugins'));
};
function log(data){
    let site=this._site;
    this.mainDiv.innerHTML='';
    let table=doe.table(
        {
            className:'bordered padding4px',
            innerHTML:`
                <thead>
                    <tr>
                        <th>Name
                        <th>Status
                </thead>
            `
        }
    );
    this.mainDiv.appendChild(table);
    data.sort((p,q)=>p.name.localeCompare(q.name));
    data.map(plugin=>{
        table.appendChild(doe.tr(
            td_name(),
            td_isActivated()
        ));
        function td_name(){
            return doe.td(
                plugin.name,
                td=>{td.style.fontFamily='Monospace';}
            )
        }
        function td_isActivated(){
            return doe.td(input_isActivated())
        }
        function input_isActivated(){
            return doe.input({
                type:'checkbox',
                checked:plugin.isactivated,
                async onchange(){
                    let parent=this.parentNode;
                    parent.removeChild(this);
                    await update(
                        'isactivated',
                        this.checked?1:0
                    );
                    parent.appendChild(this);
                }
            })
        }
        function update(key,content){
            return site.send({
                function:'updatePluginById',
                id:plugin.id,
                type:key,
                content,
            })
        }
    });
}

function UsersPage(site){
    let that;
    this.initialize=()=>{
        this.isInitialized=true;
        that=this;
        this.mainDiv=doe.div();
        this.load();
    };
    this.load=async()=>{
        let res=await site.send('getUsers');
        let data=await Promise.all(res.map(async id=>{
            let user=await site.getUser(id);
            await user.load([
                'username',
                'nickname',
            ]);
            return user
        }));
        log(data);
    };
    function log(data){
        that.mainDiv.innerHTML='';
        let table=doe.table({className:'bordered padding4px'});
        that.mainDiv.appendChild(table);
        table.innerHTML=
            '<thead>'+
                '<tr>'+
                    '<th>ID'+
                    '<th>Username'+
                    '<th>Display Name'+
            '</thead>';
        data.sort((a,b)=>a.id-b.id);
        data.map(user=>
            table.appendChild(tr_user(user))
        );
        function tr_user(user){
            return doe.tr(
                td_id(),
                td_username(),
                td_nickname(),
            )
            function td_id(){
                let td=doe.td();
                td.style.textAlign='right';
                td.innerHTML=
                    '<code>'+html.encodeText(user.id)+'</code>';
                return td
            }
            function td_username(){
                return doe.td(user.usernameA,n=>{
                    n.style.fontFamily='monospace';
                })
            }
            function td_nickname(){
                return doe.td(user.nickname)
            }
        }
    }
}

function createTable(io,data){
    return doe.table({
        className:'bordered padding4px',
        innerHTML:`
            <thead>
                <tr>
                    <th>ID
                    <th>Server ID
                    <th>key
                <tr>
                    <th colspan=3>Value
            </thead>
        `,
    },n=>{
        n.style.width='100%';
        data.sort((a,b)=>{
            return a.id_server!==b.id_server?
                a.id_server-b.id_server
            :
                a.key.localeCompare(b.key)
        });
        return data.map(plugin=>[
            tr(plugin),
            tr_code(io,plugin,plugin.value),
        ])
    })
}
function tr(plugin){
    return doe.tr(
        td_id(plugin),
        td_serverId(plugin),
        td_key(plugin)
    )
}
function td_id(plugin){
    return doe.td(n=>{
        n.style.fontFamily='Monospace';
        n.style.textAlign='right';
    },plugin.id)
}
function td_serverId(plugin){
    return doe.td(n=>{
        n.style.fontFamily='Monospace';
        n.style.textAlign='right';
    },plugin.id_server)
}
function td_key(plugin){
    return doe.td(plugin.key)
}
function tr_code(io,plugin,code){
    return doe.tr(td_code(io,plugin,code))
}
function td_code(io,plugin,code){
    return doe.td({colSpan:4},div_code(io,plugin,code))
}
function div_code(io,plugin,code){
    return doe.div(
        {
            ondblclick(){
                let
                    parent=this.parentNode,
                    textarea=textarea_code(io,plugin,code);
                parent.removeChild(this);
                parent.appendChild(textarea);
                textarea.focus();
            },
            innerHTML:code.split('\n').map((e,i)=>
                html.encodeText(e)
            ).join('<span style=color:blue>$</span>\n'),
        },
        n=>{
            doe(n.style,{
                fontFamily:'monospace',
                whiteSpace:'pre-wrap',
                wordBreak:'break-all',
                minHeight:'24pt',
            });
        }
    )
}
function textarea_code(io,plugin,code){
    return doe.textarea({
        async onblur(){
            let parent=this.parentNode;
            parent.removeChild(this);
            let newCode=this.value;
            await io.update(plugin,newCode);
            plugin.value=newCode;
            parent.appendChild(
                div_code(io,plugin,newCode)
            );
        }
    },n=>{
        n.style.minWidth='-webkit-fill-available';
        n.style.height='128px';
    },code)
}

function SitesPage(io){
    this._io=io;
}
SitesPage.prototype.initialize=function(){
    this.isInitialized=true;
    this.mainDiv=doe.div();
    this.load();
};
SitesPage.prototype.load=async function(){
    let data=await this._io.getEnvironmentvariables();
    this.mainDiv.innerHTML='';
    this.mainDiv.style.width='100%';
    this.mainDiv.appendChild(createTable({
        update:(plugin,content)=>
            this._io.updateEnvironmentvariableById(plugin.id,content)
        ,
    },data));
};

var style = `.root{
    margin:0px auto;
    max-width:600px;
}
.menu{
    padding:4px;
}
.page{
    padding:4px;
}
`;

function ControlPanel(site){
    let
        focusedPage;
    this.load=page=>{
        if(focusedPage)
            this._div_page.removeChild(focusedPage.mainDiv);
        focusedPage=this._pages[page];
        focusedPage.isInitialized||focusedPage.initialize();
        this._div_page.appendChild(focusedPage.mainDiv);
    };
    this.loadPlugins=site.applyPlugins('settings',this);
    this._pages={
        sites:      new SitesPage({
            getEnvironmentvariables:()=>
                site.send('getEnvironmentvariables'),
            updateEnvironmentvariableById:(id,content)=>
                site.send({
                    function:   'updateEnvironmentvariableById',
                    id,
                    content,
                })
        }),
        users:      new UsersPage(site),
        plugins:    new PluginsPage(site),
    };
}
ControlPanel.prototype.createUi=function(){
    return doe.div({className:'root'},
        doe.h1(doe.a({href:'control-panel'},'Control Panel')),
        doe.div({style:'width:100%'},
            this._div_menu=doe.div({
                    className:'menu',
                },
                doe.a({
                    href:'javascript:',
                    onclick:_=>this.load('sites'),
                },'Sites'),
                ' ',
                doe.a({
                    href:'javascript:',
                    onclick:_=>this.load('users'),
                },'Users'),
                ' ',
                doe.a({
                    href:'javascript:',
                    onclick:_=>this.load('plugins'),
                },'Plugins'),
            ),
            this._div_page=doe.div({
                className:'page',
                style:'width:100%'
            }),
        ),
    )
};
ControlPanel.style=doe.style(style);

doe.head(ControlPanel.style);
let
    site=new Site,
    settings=new ControlPanel(site)
;(async()=>{
    await settings.loadPlugins;
    doe.body(settings.createUi());
})();
