import PermissionError from '../PermissionError.mjs'
async function getCurrentUser(id,password){
/*
    errno:
        0: error
        1: no such session
*/
    try{
        let session=await this.getSession(id)
        return await session.getUser(password)
    }catch(e){
        if(
            e instanceof RangeError&&(
                e.name=='notFound'
            )||
            e instanceof PermissionError
        )
            throw{errno:1}
        throw{errno:0,err:e}
    }
}
export default getCurrentUser
