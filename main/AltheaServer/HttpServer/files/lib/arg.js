let res={}
localStorage.althea&&String(localStorage.althea).split(' ').map(k=>
    res[k]=true
)
export default res
