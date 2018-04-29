import fs from          'fs'
import fsPromises from  'fs/promises'
function copyAndRemove(pathToSourceFile,pathToDestFile){
    return new Promise((resolve,reject)=>{
        let rs=fs.createReadStream(pathToSourceFile)
        rs.pipe(fs.createWriteStream(pathToDestFile))
        rs.on('end',()=>
            resolve(fsPromises.unlink(pathToSourceFile))
        )
    })
}
export default copyAndRemove
