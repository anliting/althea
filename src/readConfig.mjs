import fs from  'fs'
function readConfig(path){
    try{
        return JSON.parse(fs.readFileSync(path).toString())
    }catch(e){
        return {}
    }
}
export default readConfig
