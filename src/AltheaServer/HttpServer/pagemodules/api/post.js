let
    formidable=     require('formidable'),
    functions={
        uploadFile:     require('./post/uploadFile'),
        uploadImage:    require('./post/uploadImage'),
    }
module.exports=async env=>{
    let res=await new Promise((rs,rj)=>{
        let form=new formidable.IncomingForm
        if(env.config.pathToUpload!=undefined)
            form.uploadDir=env.config.pathToUpload
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
