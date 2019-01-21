import User from '../User.js'
import login from './login.js'
import loginForm from './loadUserProperties/prototype.loginForm.js'
import currentUser from './loadUserProperties/prototype.currentUser.js'
function loadUserProperties(o){
    Object.defineProperty(o,'showLoginForm',{get(){
        let
            loginForm=this.loginForm,
            node=loginForm.node
        document.body.appendChild(node)
        loginForm.login=async(u,p,k)=>{
            if(await this.login(u,p,k))
                remove()
        }
        loginForm.usernameInput.focus()
        loginForm.on('backClick',remove)
        return loginForm
        function remove(){
            document.body.removeChild(node)
        }
    }})
    o._userChange=function(){
        delete this._currentUser
        this.send('userChange')
    }
    Object.defineProperty(o,'currentUser',currentUser)
    o.login=login
    Object.defineProperty(o,'loginForm',loginForm)
    Object.defineProperty(o,'logout',{async get(){
        document.cookie='altheaLoginSession=; path=/; max-age=0'
        await this.send('logout')
        this._userChange()
    }})
    o.getUser=async function(id){
        if(!this._users[id])
            this._users[id]=new User({
                send:this.send.bind(this),
            },id)
        return this._users[id]
    }
}
export default loadUserProperties
