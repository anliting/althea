import responseerror from './responseerror'
export default env=>{
    env.statuscode=500
    return responseerror(env)
}
