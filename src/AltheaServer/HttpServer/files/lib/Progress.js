import{EventEmmiter}from 'https://gitcdn.link/cdn/anliting/simple.js/55124630741399dd0fcbee2f0396642a428cdd24/src/simple.static.js'
import style from './Progress/style.js'
import View from './Progress/View.js'
let animationDelay= 256
function Progress(a){
    EventEmmiter.call(this)
    this._progress=0
    if(a)
        this.complete=this._messure(a)
}
Object.setPrototypeOf(Progress.prototype,EventEmmiter.prototype)
Progress.prototype._animationDelay=animationDelay
Object.defineProperty(Progress.prototype,'_animationCursor',{get(){
    if(this._animationStartTime){
        let d=new Date-this._animationStartTime
        if(d<this._animationDelay)
            return this._animationStart+(
                this.progress-this._animationStart
            )*d/this._animationDelay
    }
    return this.progress
}})
Progress.prototype._messure=async function(a){
    if(a instanceof Array){
        a.map((v,i)=>{
            if(v instanceof Progress||v instanceof Promise)
                v={p:v}
            if(!(v.p instanceof Progress))
                v.p=new Progress(v.p)
            if(v.s==undefined)
                v.s=1
            a[i]=v
        })
        let denominator=a.map(v=>v.s).reduce((a,b)=>a+b)
        a.map(v=>
            v.p.on('progress',()=>
                this.progress=a.map(v=>v.p.progress*v.s).reduce((a,b)=>
                    a+b
                )/denominator
            )
        )
        await Promise.all(a.map(v=>v.p.complete))
    }else if(a instanceof Promise)
        await a
    this.progress=1
}
Object.defineProperty(Progress.prototype,'progress',{get(){
    return this._progress
},set(val){
    let animationCursor=this._animationCursor
    this._progress=val
    if(val==0){
        this._animationStart=undefined
    }else{
        this._animationStart=animationCursor
        this._animationStartTime=new Date
    }
    this.emit('progress')
}})
Object.defineProperty(Progress.prototype,'view',{get(){
    return new View(this)
}})
Progress.style=style
export default Progress
