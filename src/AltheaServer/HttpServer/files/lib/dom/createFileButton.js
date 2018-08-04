import{EventEmmiter}from'https://gitcdn.link/cdn/anliting/simple.js/c38056039008b4889283e9e1451504358263354d/src/simple.static.js'
function createFileButton(textContent='Upload'){
    let e=new EventEmmiter
    e.n=this.button(textContent,{onclick:async()=>{
        e.emit('file',await getFile.call(this,e))
    }})
    return e
}
async function getFile(e){
    if(!e.input)
        e.input=this.input({type:'file',multiple:true,})
    e.input.value=null
    e.input.click()
    await new Promise(rs=>e.input.onchange=rs)
    return e.input.files
}
export default createFileButton
