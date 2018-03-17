let
    getPagemoduleAndEnvironment=
        require('./getPagemoduleAndEnvironment'),
    runPagemodule=          require('./runPagemodule')
module.exports=handleRequest
async function handleRequest(envVars,req,res){
    let result=await getPagemoduleAndEnvironment(
        this,req,res,envVars
    )
    return runPagemodule(
        result.module,
        result.environment
    )
}
