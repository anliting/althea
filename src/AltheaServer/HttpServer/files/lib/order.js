import{integerBinarySearch}from'https://gitcdn.link/cdn/anliting/simple.js/d76165db0cfc5b4c71786bf5a5f2e51503943294/src/simple.static.js'
function order(a,ib,ap){
    post(
        a.map(async(p,i)=>({
            i,
            v:await p
        })),
        (a,b)=>ib(a.v,b.v),
        a=>ap(a.v),
        (a,b)=>a.i<b.i
    )
}
function post(a,ib,ap,lt){
    let b=[]
    a.map(async e=>{
        e=await e
        let p=integerBinarySearch.arrayLowerBound(b,e,lt)
        if(p<b.length)
            ib(e,b[p])
        else
            ap(e)
        b.splice(p,0,e)
    })
}
order.post=post
export default order
