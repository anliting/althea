module.exports=User
function User(db,id,username,nickname,meta){
    this.db=db
    this.id=id
    this.username=username
    this.nickname=nickname
    for(let i in meta){
        if(
            i=='isadmin'||
            i=='isAnonymous'
        )
            this[i]=!!+meta[i]
        else
            this[i]=meta[i]
    }
}
User.prototype.set=async function(doc){
    let set=[],args=[]
    if('username' in doc){
        set.push('?')
        args.push({username:doc.username})
    }
    if('password' in doc){
        set.push('password=unhex(sha2(concat(id,?),256))')
        args.push(doc.password)
    }
    if('nickname' in doc){
        set.push('?')
        args.push({nickname:doc.nickname})
    }
    args.push({id:this.id})
    if(set.length==0)
        return
    await this.db.query(`
        update user
        set ${set.join(',')}
        where ?
    `,args)
}
