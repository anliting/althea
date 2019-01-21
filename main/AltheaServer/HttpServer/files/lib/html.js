let e
export default{
    encodeText(s){
        if(!e)
            e=document.createElement('div')
        e.textContent=s
        return e.innerHTML
    },
    decodeText(s){
        if(!e)
            e=document.createElement('div')
        e.innerHTML=s
        return e.textContent
    }
}
