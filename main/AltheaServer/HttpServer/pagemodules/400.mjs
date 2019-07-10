import responseerror from './responseerror.mjs'
export default env=>{
    env.statuscode=400
    return responseerror(env)
}
