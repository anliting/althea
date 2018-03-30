import mysql from 'mysql2/promise'
function databaseConnector(options){
    return mysql.createPool(Object.assign(options,{
        multipleStatments:true,
        charset:'utf8mb4_unicode_ci',
        connectionLimit:64,
    }))
}
export default databaseConnector
