export default async(site,loginForm)=>{
    let res=await loginForm.login(
        loginForm.usernameInput.value,
        loginForm.passwordInput.value,
        loginForm.kmliInput?loginForm.kmliInput.checked:true
    )
    if(!res)
        loginForm.failedDiv.style.display=''
}
