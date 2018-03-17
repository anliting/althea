module.exports=db=>{
    db.commit=require('./loadTransactionProperties/commit')
    Object.defineProperty(
        db,
        'connection',
        require('./loadTransactionProperties/connection')
    )
    db.query=require('./loadTransactionProperties/query')
    db.query0=require('./loadTransactionProperties/query0')
    db.rollback=require('./loadTransactionProperties/rollback')
    Object.defineProperty(
        db,
        'transaction',
        require('./loadTransactionProperties/transaction')
    )
    db.transactionDo=require('./loadTransactionProperties/transactionDo')
}
