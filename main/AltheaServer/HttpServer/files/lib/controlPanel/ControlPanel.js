import{doe}from             '/lib/core.static.js'
import PluginsPage from     './ControlPanel/PluginsPage.js'
import UsersPage from       './ControlPanel/UsersPage.js'
import SitesPage from       './ControlPanel/SitesPage.js'
import style from           './ControlPanel/style.js'
function ControlPanel(site){
    let
        focusedPage
    this.load=page=>{
        if(focusedPage)
            this._div_page.removeChild(focusedPage.mainDiv)
        focusedPage=this._pages[page]
        focusedPage.isInitialized||focusedPage.initialize()
        this._div_page.appendChild(focusedPage.mainDiv)
    }
    this.loadPlugins=site.applyPlugins('settings',this)
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
    }
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
}
ControlPanel.style=doe.style(style)
export default ControlPanel
