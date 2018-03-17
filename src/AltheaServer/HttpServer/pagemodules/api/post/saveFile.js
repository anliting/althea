let
    fs=             require('mz/fs'),
    copyAndRemove=  require('./saveFile/copyAndRemove')
module.exports=saveFile
function saveFile(env,source,targetPath){
    let
        destination=`${env.config.pathToUsersFiles}/${targetPath}`
    return fs.rename(source,destination).catch(err=>{
        if(err.code=='EXDEV')
            return copyAndRemove(source,destination)
        throw err
    })
}
