module.exports=commit
function commit(cn){
    return cn.query(`commit`)
}
