import{doe,html}from             '/lib/core.static.js'
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
        n.style.width='100%'
        data.sort((a,b)=>{
            return a.id_server!==b.id_server?
                a.id_server-b.id_server
            :
                a.key.localeCompare(b.key)
        })
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
        n.style.fontFamily='Monospace'
        n.style.textAlign='right'
    },plugin.id)
}
function td_serverId(plugin){
    return doe.td(n=>{
        n.style.fontFamily='Monospace'
        n.style.textAlign='right'
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
                    textarea=textarea_code(io,plugin,code)
                parent.removeChild(this)
                parent.appendChild(textarea)
                textarea.focus()
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
            })
        }
    )
}
function textarea_code(io,plugin,code){
    return doe.textarea({
        async onblur(){
            let parent=this.parentNode
            parent.removeChild(this)
            let newCode=this.value
            await io.update(plugin,newCode)
            plugin.value=newCode
            parent.appendChild(
                div_code(io,plugin,newCode)
            )
        }
    },n=>{
        n.style.minWidth='-webkit-fill-available'
        n.style.height='128px'
    },code)
}
export default createTable
