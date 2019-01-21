function AltheaObject(io,id){
    this._io=io
    this.id=id
    this._loading={}
}
AltheaObject.prototype.load=async function(columns){
    if(typeof columns=='string')
        columns=[columns]
    let object=this
    columns=calcNotIn(this)
    checkToLoad()
    await Promise.all(columns.map(c=>
        this._loading[c]
    ))
    return this
    function calcNotIn(o){
        let res=[]
        for(let c of columns)
            if(!(c in o))
                res.push(c)
        return res
    }
    async function checkToLoad(){
        let toLoad=calcNotIn(object._loading)
        if(toLoad.length==0)
            return
        let newLoading=object._io.send({
            function:object._loader,
            id:object.id,
            columns:toLoad
        })
        for(let c of toLoad)
            object._loading[c]=newLoading
        let data=await newLoading
        for(let c of toLoad){
            object[c]=data[c]
            delete object._loading[c]
        }
    }
}
export default AltheaObject
