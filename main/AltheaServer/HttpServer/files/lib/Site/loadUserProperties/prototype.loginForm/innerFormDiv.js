import doe from '../../../../_lib/doe/main/doe.mjs'
import login from './login.js'
function innerFormDiv(site,loginForm){
    let div=doe.div(
        usernameDiv(loginForm),
        passwordDiv(loginForm),
        loginForm.failedDiv=failedDiv(),
        loginButtonDiv(site,loginForm),
        registerADiv(site,loginForm)
    )
    div.style.margin='32px 48px'
    div.onkeydown=e=>{
        if(e.keyCode!=13)
            return
        e.preventDefault()
        e.stopPropagation()
        login(site,loginForm)
    }
    return div
}
function usernameDiv(loginForm){
    return doe.div(loginForm.usernameInput=doe.input(n=>{
        // let chrome 53 know it's login form
        n.name='username'
        n.placeholder='Username'
        n.style.padding='4px'
    }))
}
function passwordDiv(loginForm){
    return doe.div(
        n=>{n.style.marginTop='24px'},
        loginForm.passwordInput=passwordInput()
    )
    function passwordInput(){
        return doe.input(
            n=>{n.style.padding='4px'},
            {
                type:'password',
                // let chrome 53 know it's login form
                name:'password',
                placeholder:'Password',
            }
        )
    }
}
function failedDiv(){
    return doe.div(
        n=>{doe(n.style,{display:'none',marginTop:'24px'})},
        `
            Login failed, due to invalid username and/or
            mismatched password.
        `
    )
}
function loginButtonDiv(site,loginForm){
    return doe.div(
        n=>{n.style.marginTop='24px'},
        loginForm.loginButton=loginButton()
    )
    function loginButton(){
        let button=doe.button('Log In')
        button.style.padding='4px'
        button.onclick=e=>{
            e.stopPropagation()
            login(site,loginForm)
        }
        return button
    }
}
function registerADiv(){
    return doe.div(
        doe.a('Register a new user.',{href:'user'}),
        n=>{n.style.marginTop='24px'}
    )
}
export default innerFormDiv
