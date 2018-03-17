module.exports=calcTime
async function calcTime(f){
    let startTime=new Date
    await f()
    return (new Date)-startTime
}
