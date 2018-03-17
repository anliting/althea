import docTrans from './docTrans.js'
export default function(doc){
    doc=docTrans(doc)
    doc.port=this._sendingPortNumber++
    this._sharedWorkerPort.postMessage(doc)
    return new Promise((rs,rj)=>
        this._onMessage[doc.port]=doc=>
            doc.error!=undefined?rj(doc.error):rs(doc.value)
    )
}
