import mysql from 'mysql2/promise.js'
function databaseConnector(options){
    return mysql.createPool(Object.assign(options,{
        charset:'utf8mb4_unicode_ci',
        connectionLimit:64,
    }))
}
export default databaseConnector
