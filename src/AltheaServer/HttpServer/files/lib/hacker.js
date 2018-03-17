let hacker={
    processes:[]
}
hacker.deleteUser=function(id){
    return this.site.send({
        function:'deleteUser',
        id,
    })
}
hacker.end=function(){
    this.processes.map(p=>p.kill())
    this.processes=[]
    delete localStorage.hacker
}
hacker.getConversations=function(){
    return this.site.send({
        function:'getConversations',
    })
}
Object.defineProperty(hacker,'showLoginForm',{get(){
    this.site.showLoginForm
}})
export default hacker
