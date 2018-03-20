import responseerror from './responseerror'
export default env=>{
    env.statuscode=404
    return responseerror(env)
}
