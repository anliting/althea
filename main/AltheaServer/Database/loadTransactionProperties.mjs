import commit from          './loadTransactionProperties/commit'
import connection from      './loadTransactionProperties/connection'
import query from           './loadTransactionProperties/query'
import query0 from          './loadTransactionProperties/query0'
import rollback from        './loadTransactionProperties/rollback'
import transaction from     './loadTransactionProperties/transaction'
import transactionDo from   './loadTransactionProperties/transactionDo'
export default db=>{
    db.commit=commit
    Object.defineProperty(db,'connection',connection)
    db.query=query
    db.query0=query0
    db.rollback=rollback
    Object.defineProperty(db,'transaction',transaction)
    db.transactionDo=transactionDo
}
