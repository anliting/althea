import etag from    'etag'
import fs from      'fs'
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
    if((()=>{
        if(!(
            env.request.headers.range&&
            /^bytes=[0-9]+-[0-9]*$/.test(env.request.headers.range)
        ))
            return 1
        let
            match=env.request.headers.range.match(
                /^bytes=([0-9]+)-([0-9]*)$/
            ),
            start=+match[1],
            end=Math.min(
                match[2]==''?Infinity:+match[2]+1,
                start+chunkSize,
                fileStat.size
            )
        if(end<start)
            return 1
        env.headers['content-length']=end-start
        env.headers['content-range']=
            `bytes ${start}-${end-1}/${fileStat.size}`
        env.response.writeHead(206,env.headers)
        options.start=start
        options.end=end-1
    })()){
        env.headers['content-length']=
            fileStat.size
        env.response.writeHead(200,env.headers)
    }
    fs.createReadStream(pathToFile,options).pipe(env.response)
}
