function ImageUploader(io){
    this._io=io
}
ImageUploader.prototype._uploadImage=async function(file){
    let id=await this._io.send('newImage')
    await this._io.post({
        function:'uploadImage',
        id,
        file,
    })
    return id
}
ImageUploader.prototype.uploadImages=function(files){
    let promise=Promise.all(
        [...files].map(this._uploadImage.bind(this))
    )
    return promise
}
export default ImageUploader
