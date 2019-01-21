function rollback(cn){
    return cn.query(`rollback`)
}
export default rollback
