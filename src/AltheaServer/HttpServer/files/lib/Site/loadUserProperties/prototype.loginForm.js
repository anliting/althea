import innerFormDiv from './prototype.loginForm/innerFormDiv.js'
import dom from '../../dom.js'
import{EventEmmiter}from'https://gitcdn.link/cdn/anliting/simple.js/c38056039008b4889283e9e1451504358263354d/src/simple.static.js'
export default{get(){
    let bF=dom.createBF()
    let loginForm=new EventEmmiter
    bF.appendChild(innerFormDiv(this,loginForm))
    loginForm.node=bF.node
    bF.on('backClick',e=>loginForm.emit('backClick',e))
    return loginForm
}}
