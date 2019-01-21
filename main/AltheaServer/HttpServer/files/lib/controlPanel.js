import{Site,dom}from'/lib/core.static.js'
import ControlPanel from'./controlPanel/ControlPanel.js'
dom.head(ControlPanel.style)
let
    site=new Site,
    settings=new ControlPanel(site)
;(async()=>{
    await settings.loadPlugins
    dom.body(settings.createUi())
})()
