import fs from              'fs'
import copyAndRemove from   './saveFile/copyAndRemove.mjs'
function saveFile(env,source,targetPath){
    let
        destination=`${env.config.pathToUsersFiles}/${targetPath}`
    return fs.promises.rename(source,destination).catch(err=>{
        if(err.code=='EXDEV')
            return copyAndRemove(source,destination)
        throw err
    })
}
export default saveFile
