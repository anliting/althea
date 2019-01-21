import fs from              'fs'
import copyAndRemove from   './saveFile/copyAndRemove'
function saveFile(env,source,targetPath){
    let
        destination=`${env.althea._dataDir}/${env.config.pathToUsersFiles}/${targetPath}`
    return fs.promises.rename(source,destination).catch(err=>{
        if(err.code=='EXDEV')
            return copyAndRemove(source,destination)
        throw err
    })
}
export default saveFile
