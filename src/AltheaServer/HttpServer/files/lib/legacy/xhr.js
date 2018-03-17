function get(path){
    let req=new XMLHttpRequest
    req.open('GET',path)
    req.send()
    return new Promise(rs=>
        req.onreadystatechange=()=>
            req.readyState==4&&req.status==200&&rs(req.responseText)
    )
}
export default{
    get,
}
