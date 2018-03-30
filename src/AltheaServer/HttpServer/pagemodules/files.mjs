import etag from    'etag'
import fs from      'mz/fs'
import mime from    'mime'
let
    highWaterMark=  2**22,
    chunkSize=      2**20
export default async env=>{
    let{parsedUrl,fileStat,pathToFile}=env.analyze.request
    if(env.config.useCache){
        env.headers.etag=etag(fileStat)
        if(env.request.headers['if-none-match']===env.headers.etag){
            env.response.writeHead(304,env.headers)
            env.response.end()
            return
        }
    }
    env.headers['content-type']=
        mime.getType(parsedUrl.pathname)||'application/octet-stream'
    let options={
        highWaterMark
    }
    if(env.request.headers.range){
        let
            start=+env.request.headers.range.substring(6),
            end=Math.min(start+chunkSize,fileStat.size)
        env.headers['content-length']=end-start
        env.headers['content-range']=
            `bytes ${start}-${end-1}/${fileStat.size}`
        env.response.writeHead(206,env.headers)
        options.start=start
        options.end=end
    }else{
        env.headers['content-length']=
            fileStat.size
        env.response.writeHead(200,env.headers)
    }
    // devAnchor
    //fs.createReadStream(pathToFile,options).pipe(env.response)
    console.log(`file ${pathToFile} requested, size=${fileStat.size}`)
    let rs=fs.createReadStream(pathToFile,options)
    rs.pipe(env.response)
    let a=[]
    rs.on('data',[].push.bind(a))
    rs.on('end',()=>{
        let b=Buffer.concat(a)
        console.log(`file ${pathToFile}, size=${
            fileStat.size
        }, result buffer size=${b.length}`)
    })
    rs.on('error',e=>{
        console.log('error:',e)
    })
}
