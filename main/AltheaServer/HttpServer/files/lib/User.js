import dom from './dom.js'
import AltheaObject from './AltheaObject.js'
function User(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(User.prototype,AltheaObject.prototype)
User.prototype._loader='getUser'
User.prototype._createA=function(by){
    let a=dom.a({className:'user'})
    let final=(async()=>{
        await this.load([
            'username',
            'nickname',
        ])
        a.href=`user/${this.username}`
        a.textContent=(by=='username'?
            this.username
        :(
            this.nickname?
                this.nickname.replace(/ /,' ')
            :
                this.username
        ))
        return a
    })()
    return{
        a,
        final
    }
}
Object.defineProperty(User.prototype,'a',{get(){
    return this._createA().a
}})
Object.defineProperty(User.prototype,'finalA',{get(){
    return this._createA().final
}})
Object.defineProperty(User.prototype,'usernameA',{get(){
    return this._createA('username').a
}})
User.prototype.equal=function(u){
    return this.id==u.id
}
User.prototype.createUi=async function(cu){
    await this.load([
        'username',
        'nickname',
    ])
    return dom.div(
        dom.p(`ID: ${this.id}`),
        dom.p(`Username: ${this.username}`),
        this.nickname&&dom.p(`Nickname: ${this.nickname}`),
        this.equal(cu)&&dom.p(
            dom.a(
                {href:'edituser'},
                'Update the information or change password.'
            ),
        )
    )
}
export default User
