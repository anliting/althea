import doe from'../../_lib/doe/main/doe.mjs'
import EventEmmiter from'../../_lib/EventEmmiter/main/EventEmmiter.mjs'
function createFileButton(textContent='Upload'){
    let e=new EventEmmiter
    e.n=doe.button(textContent,{onclick:async()=>{
        e.emit('file',await getFile(e))
    }})
    return e
}
async function getFile(e){
    if(!e.input)
        e.input=doe.input({type:'file',multiple:true,})
    e.input.value=null
    e.input.click()
    await new Promise(rs=>e.input.onchange=rs)
    return e.input.files
}
export default createFileButton
