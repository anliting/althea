let fs=require('mz/fs')
module.exports=copyAndRemove
function copyAndRemove(pathToSourceFile,pathToDestFile){
    return new Promise((resolve,reject)=>{
        let rs=fs.createReadStream(pathToSourceFile)
        rs.pipe(fs.createWriteStream(pathToDestFile))
        rs.on('end',()=>
            resolve(fs.unlink(pathToSourceFile))
        )
    })
}
