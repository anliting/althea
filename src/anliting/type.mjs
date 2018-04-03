function isArray(f){
    return v=>Array.isArray(v)&&v.every(f)
}
function isObject(v){
    return typeof v=='object'
}
function isStringValue(v){
    return typeof v=='string'
}
function stringIsInteger(value){
    return value==parseInt(value,10).toString()
}
export default{
    isArray,
    isObject,
    isStringValue,
    stringIsInteger,
}
