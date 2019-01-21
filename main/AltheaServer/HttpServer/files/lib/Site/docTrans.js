export default doc=>{
    if(typeof doc=='string')
        doc={function:doc}
    let res={
        function:doc.function,
    }
    if('arguments' in doc){
        res.arguments=doc.arguments
        return res
    }
    res.arguments={}
    for(let i in doc)if(i!='function')
        res.arguments[i]=doc[i]
    return res
}
