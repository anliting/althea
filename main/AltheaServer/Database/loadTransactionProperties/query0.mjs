export default async function(query,data){
    return(await this.query(query,data))[0]
}
