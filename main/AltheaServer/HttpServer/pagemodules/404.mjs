import responseerror from './responseerror.mjs'
export default env=>{
    env.statuscode=404
    return responseerror(env)
}
