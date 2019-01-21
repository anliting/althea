import responseerror from './responseerror'
export default env=>{
    env.statuscode=400
    return responseerror(env)
}
