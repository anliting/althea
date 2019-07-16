import getPagemoduleAndEnvironment from'./getPagemoduleAndEnvironment.mjs'
import runPagemodule from'./runPagemodule.mjs'
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
