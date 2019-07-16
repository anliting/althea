import formidable from      'formidable'
import uploadFile from      './post/uploadFile.mjs'
import uploadImage from     './post/uploadImage.mjs'
let
    functions={
        uploadFile,
        uploadImage,
    }
export default async env=>{
    let res=await new Promise((rs,rj)=>{
        let form=new formidable.IncomingForm
        form.maxFileSize=4*2**30
        if(env.config.pathToUpload!=undefined)
            form.uploadDir=`${env.althea._dataDir}/${env.config.pathToUpload}`
        form.parse(env.request,(err,fields,files)=>
            err?rj(err):rs({fields,files})
        )
    })
    if(!functions[res.fields.function])
        return 400
    await functions[res.fields.function](env,res.fields,res.files)
    return{
        status:200,
        content:JSON.stringify(null),
    }
}
