let
    saveFile=  require('./saveFile')
module.exports=uploadFile
function uploadFile(env,fields,files){
    return saveFile(
        env,
        files.file.path,
        `home/${fields.directory}/${files.file.name}`
    )
}
