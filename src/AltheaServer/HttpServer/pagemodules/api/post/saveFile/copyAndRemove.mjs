import fs from          'fs'
function copyAndRemove(pathToSourceFile,pathToDestFile){
    return new Promise((resolve,reject)=>{
        let rs=fs.createReadStream(pathToSourceFile)
        rs.pipe(fs.createWriteStream(pathToDestFile))
        rs.on('end',()=>
            resolve(fs.promises.unlink(pathToSourceFile))
        )
    })
}
export default copyAndRemove
