import responseerror from './responseerror.mjs'
export default env=>{
    env.statuscode=403
    return responseerror(env)
}
