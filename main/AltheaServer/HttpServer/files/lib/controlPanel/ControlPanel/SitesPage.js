import{dom}from             '/lib/core.static.js'
import createTable from     './SitesPage/createTable.js'
function SitesPage(io){
    this._io=io
}
SitesPage.prototype.initialize=function(){
    this.isInitialized=true
    this.mainDiv=dom.div()
    this.load()
}
SitesPage.prototype.load=async function(){
    let data=await this._io.getEnvironmentvariables()
    this.mainDiv.innerHTML=''
    this.mainDiv.style.width='100%'
    this.mainDiv.appendChild(createTable({
        update:(plugin,content)=>
            this._io.updateEnvironmentvariableById(plugin.id,content)
        ,
    },data))
}
export default SitesPage
