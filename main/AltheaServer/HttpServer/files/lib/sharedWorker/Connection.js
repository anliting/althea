let
    offlineTime=8e3
function Connection(){
    this._ws=createWs()
    this._ws.onclose=_=>
        this.onClose&&this.onClose()
    this._ws.onmessage=e=>{
        let doc=JSON.parse(e.data)
        if('function' in doc){
            if(doc.function=='ping')
                this._ws.send(JSON.stringify({
                    function:'pong'
                }))
        }else if('port' in doc)
            this.onMessage(doc)
    }
    this._ws.onopen=_=>
        this.onOpen&&this.onOpen()
}
Connection.prototype.send=async function(doc){
    try{switch(this._ws.readyState){
        // connecting
        case 0:
            await new Promise((rs,rj)=>{
                this._ws.addEventListener('close',rj)
                this._ws.addEventListener('error',rj)
                this._ws.addEventListener('open',rs)
            })
        // open
        case 1:
            this._ws.send(JSON.stringify(doc))
            return
        // closing
        case 2:
        // closed
        case 3:
            throw 0
    }}catch(e){
        throw 0
    }
}
function createWs(){
    return new WebSocket(`${
        location.protocol=='http:'?'ws:':'wss:'
    }//${location.hostname}:${
        self._port
    }/`)
}
export default Connection
