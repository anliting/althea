import doe from'../../_lib/doe/main/doe.mjs'
import moduleLoader from'./module.js'
let
    root='https://unpkg.com/material-components-web@0.24.0/dist',
    iconCss='https://fonts.googleapis.com/icon?family=Material+Icons',
    componentCss=`${root}/material-components-web.min.css`,
    materialComponentLoaded,
    materialIconLoaded
function material(){
    return Promise.all([
        materialComponent(),
        materialIcon(),
    ])
}
function materialComponent(){
    if(!materialComponentLoaded)
        materialComponentLoaded=(async()=>{
            let module=await moduleLoader()
            await Promise.all([
                (async()=>{
                    doe.head(doe.style(
                        await module.getByPath(componentCss)
                    ))
                })(),
                module.scriptByPath(
                    `${root}/material-components-web.min.js`
                ),
            ])
        })()
    return materialComponentLoaded
}
function materialIcon(){
    if(!materialIconLoaded)
        materialIconLoaded=(async()=>{
            let module=await moduleLoader()
            doe.head(doe.style(
                await module.getByPath(iconCss)
            ))
        })()
    return materialIconLoaded
}
export default{
    material,
    materialComponent,
    materialIcon,
}
