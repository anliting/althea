export default{async get(){
    let cn=await this.connection
    await cn.query(`start transaction`)
    return cn
}}
