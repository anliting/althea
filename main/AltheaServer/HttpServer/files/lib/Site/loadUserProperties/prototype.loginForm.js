import innerFormDiv from './prototype.loginForm/innerFormDiv.js'
import dom from '../../dom.js'
import EventEmmiter from'../../../_lib/EventEmmiter/main/EventEmmiter.mjs'
export default{get(){
    let bF=dom.createBF()
    let loginForm=new EventEmmiter
    bF.appendChild(innerFormDiv(this,loginForm))
    loginForm.node=bF.node
    bF.on('backClick',e=>loginForm.emit('backClick',e))
    return loginForm
}}
