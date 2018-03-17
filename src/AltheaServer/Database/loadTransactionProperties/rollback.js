module.exports=rollback
function rollback(cn){
    return cn.query(`rollback`)
}
