function PermissionError(message){
    return Object.setPrototypeOf(
        new Error(message),
        PermissionError.prototype
    )
}
Object.setPrototypeOf(PermissionError.prototype,Error.prototype)
PermissionError.prototype.name='PermissionError'
export default PermissionError
