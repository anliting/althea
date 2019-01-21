async function transactionDo(f){
    let cn=await this.transaction
    let err
    try{
        await f(cn)
    }catch(e){
        err=e
    }
    await this[err===undefined?'commit':'rollback'](cn)
    cn.release()
    if(err!==undefined)
        throw err
}
export default transactionDo
