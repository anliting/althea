let f=()=>new Promise(rs=>{
    document.body.appendChild(
        Object.assign(document.createElement('script'),{
            src:'https://gitcdn.link/cdn/anliting/module/7acf061d1e23cb5017b064bc6fd898a544ec8276/src/module.js',
            onload(){
                rs(this.__module)
                document.body.removeChild(this)
            },
        })
    )
})
let cache
export default()=>{
    if(!cache)
        cache=f()
    return cache
}
