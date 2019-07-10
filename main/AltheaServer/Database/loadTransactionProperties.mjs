import commit from          './loadTransactionProperties/commit.mjs'
import connection from      './loadTransactionProperties/connection.mjs'
import query from           './loadTransactionProperties/query.mjs'
import query0 from          './loadTransactionProperties/query0.mjs'
import rollback from        './loadTransactionProperties/rollback.mjs'
import transaction from     './loadTransactionProperties/transaction.mjs'
import transactionDo from   './loadTransactionProperties/transactionDo.mjs'
export default db=>{
    db.commit=commit
    Object.defineProperty(db,'connection',connection)
    db.query=query
    db.query0=query0
    db.rollback=rollback
    Object.defineProperty(db,'transaction',transaction)
    db.transactionDo=transactionDo
}
