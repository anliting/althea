async function calcTime(f){
    let s=process.hrtime.bigint()
    await f()
    return Number(process.hrtime.bigint()-s)/1e9
}
export default calcTime
