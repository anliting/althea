export default(o,f=v=>v,res={})=>{
    for(let m in o)
        Object.defineProperty(res,m,{configurable:true,get(){
            Object.defineProperty(res,m,{value:f(o[m])})
            return res[m]
        }})
    return res
}
