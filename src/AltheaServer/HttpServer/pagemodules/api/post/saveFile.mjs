import fsPromises from      'fs/promises'
import copyAndRemove from './saveFile/copyAndRemove'
function saveFile(env,source,targetPath){
    let
        destination=`${env.config.pathToUsersFiles}/${targetPath}`
    return fsPromises.rename(source,destination).catch(err=>{
        if(err.code=='EXDEV')
            return copyAndRemove(source,destination)
        throw err
    })
}
export default saveFile
