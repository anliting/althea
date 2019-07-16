import saveFile from './saveFile.mjs'
function uploadFile(env,fields,files){
    return saveFile(
        env,
        files.file.path,
        `home/${fields.directory}/${files.file.name}`
    )
}
export default uploadFile
