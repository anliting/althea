import responseerror from './responseerror.mjs'
export default env=>{
    env.statuscode=500
    return responseerror(env)
}
