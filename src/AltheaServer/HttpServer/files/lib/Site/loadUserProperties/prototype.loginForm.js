import innerFormDiv from './prototype.loginForm/innerFormDiv.js'
import dom from '../../dom.js'
import{EventEmmiter}from 'https://gitcdn.link/cdn/anliting/simple.js/55124630741399dd0fcbee2f0396642a428cdd24/src/simple.static.js'
export default{get(){
    let bF=dom.createBF()
    let loginForm=new EventEmmiter
    bF.appendChild(innerFormDiv(this,loginForm))
    loginForm.node=bF.node
    bF.on('backClick',e=>loginForm.emit('backClick',e))
    return loginForm
}}
