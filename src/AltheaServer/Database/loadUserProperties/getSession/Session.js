let
    crypto=             require('crypto'),
    PermissionError=    require('../../PermissionError')
module.exports=Session
function Session(db,id,id_user,password){
    this._db=db
    this._id=id
    this._id_user=id_user
    this._password=password
}
Session.prototype.getUser=async function(password){
    if(
        crypto.createHash('sha256').update(
            this._id+password
        ).digest().compare(
            this._password
        )
    )
        throw PermissionError('Wrong password.')
    return this._db.getUser(this._id_user)
}
