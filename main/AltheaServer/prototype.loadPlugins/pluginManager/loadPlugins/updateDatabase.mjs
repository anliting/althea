async function updateDatabase(edges){
    let ver=await getDbVer(this)
    while(ver in edges)
        ver=await edges[ver](this.database)
    setDbVer(this,ver)
}
async function getData(althea){
    let data=await althea.getData()
    return data?JSON.parse(data):{}
}
async function getDbVer(althea){
    return(await getData(althea)).databaseVersion||0
}
async function setDbVer(althea,ver){
    let data=await getData(althea)
    data.databaseVersion=ver
    await althea.setData(data)
}
export default updateDatabase
