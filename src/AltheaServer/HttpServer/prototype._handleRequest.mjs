import getPagemoduleAndEnvironment from'./getPagemoduleAndEnvironment'
import runPagemodule from'./runPagemodule'
async function handleRequest(envVars,req,res){
    let result=await getPagemoduleAndEnvironment(
        this,req,res,envVars
    )
    return runPagemodule(
        result.module,
        result.environment
    )
}
export default handleRequest
