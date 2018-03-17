function Connection(){
    this._ws=createWs();
    this._ws.onclose=_=>
        this.onClose&&this.onClose();
    this._ws.onmessage=e=>{
        let doc=JSON.parse(e.data);
        if('function' in doc){
            if(doc.function=='ping')
                this._ws.send(JSON.stringify({
                    function:'pong'
                }));
        }else if('port' in doc)
            this.onMessage(doc);
    };
    this._ws.onopen=_=>
        this.onOpen&&this.onOpen();
}
Connection.prototype.send=async function(doc){
    try{switch(this._ws.readyState){
        // connecting
        case 0:
            await new Promise((rs,rj)=>{
                this._ws.addEventListener('close',rj);
                this._ws.addEventListener('error',rj);
                this._ws.addEventListener('open',rs);
            });
        // open
        case 1:
            this._ws.send(JSON.stringify(doc));
            return
        // closing
        case 2:
        // closed
        case 3:
            throw 0
    }}catch(e){
        throw 0
    }
};
function createWs(){
    let protocol=location.protocol=='http:'?'ws:':'wss:';
    return new WebSocket(`${protocol}//${location.host}/ws`)
}

function Api(){
    this.status='offline';
    this._nextSessionPort=0;
    this._sessions=[];
    this._onMessage={};
    apiCreateConnection.call(this);
    this._Session=apiCreateSessionConstructor.call(this);
}
Api.prototype.send=function(doc){
    if(!('port' in doc)){
        doc.port=this._nextSessionPort++;
        this._connection.send(doc);
        return new Promise((rs,rj)=>
            this._onMessage[doc.port]=(err,res)=>
                err?rj(err):rs(res)
        )
    }else{
        this._connection.send(doc);
    }
};
Api.prototype.createSession=function(){
    let port=this._nextSessionPort++;
    let session=new this._Session(port);
    this._sessions.push(session);
    this._onMessage[port]=(err,res)=>
        session.onMessage(err,res);
    return session
};
function apiChangeStatus(status){
    this.status=status;
    this.onStatusChange&&this.onStatusChange();
}
function apiCreateConnection(){
    let c=new Connection;
    c.onClose=_=>{
        delete this._connection;
        c.onClose=c.onOpen=null;
        apiChangeStatus.call(this,'offline');
        apiCreateConnection.call(this);
    };
    c.onOpen=_=>{
        apiChangeStatus.call(this,'online');
    };
    c.onMessage=doc=>
        this._onMessage[doc.port](doc.error,doc.value);
    this._connection=c;
}
function apiCreateSessionConstructor(){
    function Session(id){
        this._id=id;
    }
    Session.prototype._api=this;
    Session.prototype.send=function(doc){
        doc.port=this._id;
        this._api.send(doc);
    };
    return Session
}

function Client(){
    this._api=new Api;
    this._api.onStatusChange=_=>
        this._broadcast({
            function:'statusChange',
            status:this._api.status,
        });
    this._ports=new Map;
}
Client.prototype._broadcast=function(doc){
    for(let port of this._ports.keys())
        port.postMessage(doc);
};
Client.prototype._getCurrentUser=function(){
    if(this._getCurrentUser_)
        return this._getCurrentUser_
    this._getCurrentUser_=this._api.send({
        function:'getCurrentUser',
        arguments:{}
    });
    return this._getCurrentUser_
};
Client.prototype._userChange=function(){
    delete this._getCurrentUser_;
    this._broadcast('userChange');
};
Client.prototype._handleMessage=function(port,doc){
    let send=doc=>{
        let portMap=this._ports.get(port);
        if(doc.port in portMap.tabSessionPortToServerSession){
            let session=
                portMap.tabSessionPortToServerSession[doc.port];
            session.send(doc);
        }else{
            let portNumber=doc.port;
            delete doc.port;
            responseWith(portNumber,this._api.send(doc));
        }
    };
    if(doc.function=='registerPort'){
        let
            portMap=this._ports.get(port),
            serverSession=this._api.createSession();
        serverSession.onMessage=(err,res)=>{
            let d={
                port:doc.port,
            };
            if(err!=undefined)
                d.error=err;
            else
                d.value=res;
            port.postMessage(d);
        };
        portMap.tabSessionPortToServerSession[doc.port]=
            serverSession;
        portMap.serverSessionToTabSessionPort.set(
            serverSession,
            doc.port
        );
    }else if(doc.function=='unregisterPort'){
        let
            portMap=this._ports.get(port),
            serverSession=
                portMap.tabSessionPortToServerSession[doc.port];
        delete portMap.tabSessionPortToServerSession[doc.port];
        portMap.serverSessionToTabSessionPort.delete(serverSession);
    }else if(doc.function=='getCurrentUser')
        responseWith(doc.port,this._getCurrentUser());
    else if(doc.function=='send')
        send(doc.arguments.doc);
    else if(doc.function=='userChange')
        this._userChange();
    else
        send(doc);
    async function responseWith(portNumber,val){
        let d={
            port:portNumber,
        };
        try{
            d.value=await val;
        }catch(e){
            d.error=e;
        }
        port.postMessage(d);
    }
};
Client.prototype.register=function(port){
    port.onmessage=e=>this._handleMessage(port,e.data);
    this._ports.set(port,{
        tabSessionPortToServerSession:{},
        serverSessionToTabSessionPort:new Map,
    });
    port.postMessage({
        function:'statusChange',
        status:this._api.status,
    });
};

let client=new Client;
client.register(self);
