import rollup from 'rollup'
let
    skip=[
        '/lib/core.static.js',
        'https://gitcdn.link/cdn/anliting/simple.js/d76165db0cfc5b4c71786bf5a5f2e51503943294/src/simple.static.js',
    ]
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
        external:s=>skip.includes(s),
    })
    await bundle.write({
        file,
        format:'es',
        paths:s=>skip.includes(s)&&s,
    })
}
let
    files='AltheaServer/HttpServer/files',
    lib=`${files}/lib`
link(`${files}/serviceWorker.js`,`${files}/serviceWorker.static.js`)
link(`${files}/sharedWorker.js`,`${files}/sharedWorker.static.js`)
link(
    `${files}/sharedWorkerForChromeMobile.js`,
    `${files}/sharedWorkerForChromeMobile.static.js`
)
link(`${lib}/controlPanel.js`,`${lib}/controlPanel.static.js`)
link(`${lib}/core.js`,`${lib}/core.static.js`)
