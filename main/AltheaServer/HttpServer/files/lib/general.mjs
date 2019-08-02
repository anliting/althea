export default()=>{
    if(navigator.serviceWorker)
        navigator.serviceWorker.register('serviceWorker.static.js')
}
