import fs from      'fs'
export default async(env,decodedPathname)=>{
    /*
        1: not file.
        2: is file, in `${mainDir}/AltheaServer/HttpServer/files/`.
        3: is file, in env.config.pathToUsersFiles.
        4: is file, in env.config.pathToPlugins.
    */
    let path=decodedPathname.split('/')
    return(path[1]=='plugins'&&3<=path.length?
        await f(`${env.config.pathToPlugins}/${path[2]}/files/${
            path.slice(3).join('/')
        }`,4)
    :
        await f(
            `${env.althea._mainDir}/AltheaServer/HttpServer/files${
                decodedPathname
            }`,2
        )||
        await f(`${env.config.pathToUsersFiles}${decodedPathname}`,3)
    )||{status:1}
    async function f(path,n){
        let res=await checkIfIsFileByPath(path)
        if(res.isFile)
            return{status:n,fileStat:res.fileStat}
    }
}
async function checkIfIsFileByPath(path){
    try{
        let fileStat=await fs.promises.stat(path)
        return{
            isFile:fileStat.isFile(),
            fileStat
        }
    }catch(e){
        return{
            isFile:false
        }
    }
}
