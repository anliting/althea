module.exports=function(query,data){
    return this.pool.query(query,data)
}
