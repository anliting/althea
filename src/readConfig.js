let fs=require('fs')
module.exports=readConfig
function readConfig(path){
    try{
        return JSON.parse(fs.readFileSync(path).toString())
    }catch(e){
        return {}
    }
}
