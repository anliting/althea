import{dom}from             '/lib/core.static.js'
function PluginsPage(site){
    this._site=site
}
PluginsPage.prototype.initialize=function(){
    this.isInitialized=true
    this.mainDiv=dom.div()
    this.load()
}
PluginsPage.prototype.load=async function(){
    log.call(this,await this._site.send('getPlugins'))
}
function log(data){
    let site=this._site
    this.mainDiv.innerHTML=''
    let table=dom.table(
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
    )
    this.mainDiv.appendChild(table)
    data.sort((p,q)=>p.name.localeCompare(q.name))
    data.map(plugin=>{
        table.appendChild(dom.tr(
            td_name(),
            td_isActivated()
        ))
        function td_name(){
            return dom.td(
                plugin.name,
                td=>{td.style.fontFamily='Monospace'}
            )
        }
        function td_isActivated(){
            return dom.td(input_isActivated())
        }
        function input_isActivated(){
            return dom.input({
                type:'checkbox',
                checked:plugin.isactivated,
                async onchange(){
                    let parent=this.parentNode
                    parent.removeChild(this)
                    await update(
                        'isactivated',
                        this.checked?1:0
                    )
                    parent.appendChild(this)
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
    })
}
export default PluginsPage
