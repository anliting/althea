import EventEmmiter from'../../_lib/EventEmmiter/main/EventEmmiter.mjs'
import doe from'../../_lib/doe/main/doe.mjs'
function createForeground(){
    return doe.div(div=>{
        doe(div.style,{
            backgroundColor:'white',
            position:'absolute',
            left:'50%',
            top:'50%',
            transform:'translate(-50%,-50%)',
            maxHeight:'100%',
            overflowY:'auto',
        })
        div.onclick=e=>
            e.stopPropagation()
    })
}
function createBF(){
    let
        foreground=createForeground(),
        div=doe.div(n=>{
            doe(n.style,{
                position:'fixed',
                left:'0',
                top:'0',
                width:'100%',
                height:'100%',
                background:'rgba(0,0,0,0.5)',
            })
        },foreground),
        res=new EventEmmiter
    res.node=div
    res.end=_=>
        div.parentNode.removeChild(div)
    div.onclick=e=>{
        e.preventDefault()
        e.stopPropagation()
        res.emit('backClick')
    }
    res.appendChild=e=>
        foreground.appendChild(e)
    return res
}
export default createBF
