import{dom,html}from             '/lib/core.static.js'
function UsersPage(site){
    let that
    this.initialize=()=>{
        this.isInitialized=true
        that=this
        this.mainDiv=dom.div()
        this.load()
    }
    this.load=async()=>{
        let res=await site.send('getUsers')
        let data=await Promise.all(res.map(async id=>{
            let user=await site.getUser(id)
            await user.load([
                'username',
                'nickname',
            ])
            return user
        }))
        log(data)
    }
    function log(data){
        that.mainDiv.innerHTML=''
        let table=dom.table({className:'bordered padding4px'})
        that.mainDiv.appendChild(table)
        table.innerHTML=
            '<thead>'+
                '<tr>'+
                    '<th>ID'+
                    '<th>Username'+
                    '<th>Display Name'+
            '</thead>'
        data.sort((a,b)=>a.id-b.id)
        data.map(user=>
            table.appendChild(tr_user(user))
        )
        function tr_user(user){
            return dom.tr(
                td_id(),
                td_username(),
                td_nickname(),
            )
            function td_id(){
                let td=dom.td()
                td.style.textAlign='right'
                td.innerHTML=
                    '<code>'+html.encodeText(user.id)+'</code>'
                return td
            }
            function td_username(){
                return dom.td(user.usernameA,n=>{
                    n.style.fontFamily='monospace'
                })
            }
            function td_nickname(){
                return dom.td(user.nickname)
            }
        }
    }
}
export default UsersPage
