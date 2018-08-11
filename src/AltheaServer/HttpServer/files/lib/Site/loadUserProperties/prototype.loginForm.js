import innerFormDiv from './prototype.loginForm/innerFormDiv.js'
import dom from '../../dom.js'
import{EventEmmiter}from'https://gitcdn.link/cdn/anliting/simple.js/09b9cd311f438c07fd1ac0ead044aed97158faf3/src/simple.static.js'
export default{get(){
    let bF=dom.createBF()
    let loginForm=new EventEmmiter
    bF.appendChild(innerFormDiv(this,loginForm))
    loginForm.node=bF.node
    bF.on('backClick',e=>loginForm.emit('backClick',e))
    return loginForm
}}
