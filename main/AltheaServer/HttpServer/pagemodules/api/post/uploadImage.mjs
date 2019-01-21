import saveFile from './saveFile'
import gm from 'gm'
async function uploadImage(env,fields,files){
    let id=fields.id
    await saveFile(env,files.file.path,`img/${id}.jpg`)
    await resize(
        `${env.althea._dataDir}/${env.config.pathToUsersFiles}/img/${id}.jpg`,
        `${env.althea._dataDir}/${env.config.pathToUsersFiles}/img/${id}c800x600.jpg`
    )
}
function resize(rawImage,resizedImage){
    return new Promise((rs,rj)=>
        gm(rawImage).resize(
            800,600
        ).write(resizedImage,err=>err?rj(err):rs())
    )
}
export default uploadImage
