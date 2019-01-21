export default{async get(){
    return this.getUser(await this.send('getCurrentUser'))
}}
