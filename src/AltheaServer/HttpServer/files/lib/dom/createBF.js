import{EventEmmiter}from'https://gitcdn.link/cdn/anliting/simple.js/09b9cd311f438c07fd1ac0ead044aed97158faf3/src/simple.static.js'
function createForeground(){
    return this('div',div=>{
        this(div.style,{
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
        foreground=createForeground.call(this),
        div=this('div',n=>{
            this(n.style,{
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
