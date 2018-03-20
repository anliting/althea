import responseerror from './responseerror'
export default env=>{
    env.statuscode=403
    return responseerror(env)
}
