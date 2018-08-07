import innerFormDiv from './prototype.loginForm/innerFormDiv.js'
import dom from '../../dom.js'
import{EventEmmiter}from'https://gitcdn.link/cdn/anliting/simple.js/d76165db0cfc5b4c71786bf5a5f2e51503943294/src/simple.static.js'
export default{get(){
    let bF=dom.createBF()
    let loginForm=new EventEmmiter
    bF.appendChild(innerFormDiv(this,loginForm))
    loginForm.node=bF.node
    bF.on('backClick',e=>loginForm.emit('backClick',e))
    return loginForm
}}
