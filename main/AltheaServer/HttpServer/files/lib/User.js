import doe from'../_lib/doe/main/doe.mjs'
import AltheaObject from'./AltheaObject.js'
function User(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(User.prototype,AltheaObject.prototype)
User.prototype._loader='getUser'
User.prototype._createA=function(by){
    let a=doe.a({className:'user'})
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
    return doe.div(
        doe.p(`ID: ${this.id}`),
        doe.p(`Username: ${this.username}`),
        this.nickname&&doe.p(`Nickname: ${this.nickname}`),
        this.equal(cu)&&doe.p(
            doe.a(
                {href:'edituser'},
                'Update the information or change password.'
            ),
        )
    )
}
export default User
