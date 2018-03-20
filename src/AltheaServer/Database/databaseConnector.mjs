import mysql from 'mysql2/promise'
function databaseConnector(options){
    options.multipleStatments=true
    options.charset='utf8mb4_unicode_ci'
    options.connectionLimit=64
    return mysql.createPool(options)
}
export default databaseConnector
