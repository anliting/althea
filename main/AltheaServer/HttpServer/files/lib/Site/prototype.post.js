function toFormData(doc){
    let formdata=new FormData
    for(let i in doc)
        formdata.append(i,doc[i])
    return formdata
}
export default doc=>{
    let req=new XMLHttpRequest
    req.open('POST','_api')
    req.send(toFormData(doc))
    return new Promise(rs=>
        req.onreadystatechange=()=>
            req.readyState==4&&req.status==200&&
                rs(JSON.parse(req.responseText))
    )
}
