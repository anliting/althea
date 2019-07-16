import{Site,doe}from'/lib/core.static.js'
import ControlPanel from'./controlPanel/ControlPanel.js'
doe.head(ControlPanel.style)
let
    site=new Site,
    settings=new ControlPanel(site)
;(async()=>{
    await settings.loadPlugins
    doe.body(settings.createUi())
})()
