let getCommitId=require('./getEnvironmentVariables/getCommitId')
module.exports=getEnvironmentVariables
async function getEnvironmentVariables(althea){
    let
        res=loadFromDb(althea),
        commitId=getCommitId()
    res=await res
    res.commitId=await commitId
    Object.assign(res,althea.config.overrideEnv)
    return res
}
async function loadFromDb(althea){
    await althea.database.load
    let rows=await althea.database.query0(`
        select \`key\`,value
        from environmentvariable
        where ?||?
        order by id_server
    `,[
        {id_server:0},
        {id_server:althea.config.serverId},
    ])
    let res={}
    rows.map(e=>res[e.key]=e.value)
    return res
}
