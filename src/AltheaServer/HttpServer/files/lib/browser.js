let browser={}
Object.defineProperty(browser,'isMobile',{get(){
    return navigator.userAgent.toLowerCase().includes('mobile')
}})
export default browser
