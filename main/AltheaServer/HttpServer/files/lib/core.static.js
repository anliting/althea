function doe(n){
    let
        state=0,
        p={
            function:f=>f(n),
            number,
            object,
            string,
        };
    transform([...arguments].slice(1));
    return n
    function number(n){
        state=n;
    }
    function object(o){
        if(o instanceof Array)
            array();
        else if(o instanceof Node)
            n[state?'removeChild':'appendChild'](o);
        else if(('length' in o)||o[Symbol.iterator]){
            o=Array.from(o);
            array();
        }else if(state)
            Object.entries(o).map(([a,b])=>n.setAttribute(a,b));
        else
            Object.assign(n,o);
        function array(){
            o.map(transform);
        }
    }
    function string(s){
        n.appendChild(document.createTextNode(s));
    }
    function transform(t){
        for(let q;q=p[typeof t];t=q(t));
    }
}
let methods={
    html(){
        return doe(document.documentElement,...arguments)
    },
    head(){
        return doe(document.head,...arguments)
    },
    body(){
        return doe(document.body,...arguments)
    },
};
var doe$1 = new Proxy(doe,{
    get:(t,p)=>methods[p]||function(){
        return doe(document.createElement(p),...arguments)
    }
});

function EventEmmiter(){
    this._listeners={};
}
EventEmmiter.prototype._keyExist=function(key){
    return key in this._listeners
};
EventEmmiter.prototype._ensureKeyExist=function(key){
    if(!(key in this._listeners))
        this._listeners[key]=new Map;
};
EventEmmiter.prototype.emit=function(key,event){
    if(!this._keyExist(key))
        return
    for(let[listener,doc]of [...this._listeners[key].entries()]){
        if(doc.once)
            this.off(key,listener);
        listener(event);
    }
};
EventEmmiter.prototype.off=function(key,listener){
    if(!this._keyExist(key))
        return
    this._listeners[key].delete(listener);
};
EventEmmiter.prototype.on=function(key,listener){
    this._ensureKeyExist(key);
    this._listeners[key].set(listener,{once:false});
};
EventEmmiter.prototype.once=function(key,listener){
    this._ensureKeyExist(key);
    this._listeners[key].set(listener,{once:true});
};

var path = {
    normalize(s){
        let res;
        if(s[0]=='/'){
            let a=[];
            for(let t of s.split('/')){
                if(t==''||t=='.')
                    continue
                if(t=='..'){
                    if(a.length)
                        a.pop();
                    continue
                }
                a.push(t);
            }
            res='/'+a.join('/')+(a.length&&s[s.length-1]=='/'?'/':'');
        }else {
            let a=[];
            for(let t of s.split('/')){
                if(t==''||t=='.')
                    continue
                if(t=='..'&&a.length){
                    a.pop();
                    continue
                }
                a.push(t);
            }
            res=(a.length?a.join('/'):'.')+(s[s.length-1]=='/'?'/':'');
        }
        return res
    },
};

let uri={};
uri.matchAbsoluteUri=function(s){
// from http://jmrware.com/articles/2009/uri_regexp/URI_regex.html
    return s.match(/[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?(?:\#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?/)
};

function AltheaObject(io,id){
    this._io=io;
    this.id=id;
    this._loading={};
}
AltheaObject.prototype.load=async function(columns){
    if(typeof columns=='string')
        columns=[columns];
    let object=this;
    columns=calcNotIn(this);
    checkToLoad();
    await Promise.all(columns.map(c=>
        this._loading[c]
    ));
    return this
    function calcNotIn(o){
        let res=[];
        for(let c of columns)
            if(!(c in o))
                res.push(c);
        return res
    }
    async function checkToLoad(){
        let toLoad=calcNotIn(object._loading);
        if(toLoad.length==0)
            return
        let newLoading=object._io.send({
            function:object._loader,
            id:object.id,
            columns:toLoad
        });
        for(let c of toLoad)
            object._loading[c]=newLoading;
        let data=await newLoading;
        for(let c of toLoad){
            object[c]=data[c];
            delete object._loading[c];
        }
    }
};

function ImageUploader(io){
    this._io=io;
}
ImageUploader.prototype._uploadImage=async function(file){
    let id=await this._io.send('newImage');
    await this._io.post({
        function:'uploadImage',
        id,
        file,
    });
    return id
};
ImageUploader.prototype.uploadImages=function(files){
    let promise=Promise.all(
        [...files].map(this._uploadImage.bind(this))
    );
    return promise
};

var style = `
    div.progressBar{
        position:fixed;
        top:0px;
        height:2px;
        background:gray;
    }
`;

function View(progress){
    this._progress=progress;
    this.node=createNode(this);
}
Object.defineProperty(View.prototype,'free',{get(){
    cancelAnimationFrame(this._animationFrame);
}});
function createNode(view){
    let n=doe$1.div({className:'progressBar'});
    let f=()=>{
        view._animationFrame=requestAnimationFrame(f);
        n.style.left=(1-view._progress._animationCursor)/2*100+'%';
        n.style.width=view._progress._animationCursor*100+'%';
    };
    view._animationFrame=requestAnimationFrame(f);
    return n
}

let animationDelay= 256;
function Progress(a){
    EventEmmiter.call(this);
    this._progress=0;
    if(a)
        this.complete=this._messure(a);
}
Object.setPrototypeOf(Progress.prototype,EventEmmiter.prototype);
Progress.prototype._animationDelay=animationDelay;
Object.defineProperty(Progress.prototype,'_animationCursor',{get(){
    if(this._animationStartTime){
        let d=new Date-this._animationStartTime;
        if(d<this._animationDelay)
            return this._animationStart+(
                this.progress-this._animationStart
            )*d/this._animationDelay
    }
    return this.progress
}});
Progress.prototype._messure=async function(a){
    if(a instanceof Array){
        a.map((v,i)=>{
            if(v instanceof Progress||v instanceof Promise)
                v={p:v};
            if(!(v.p instanceof Progress))
                v.p=new Progress(v.p);
            if(v.s==undefined)
                v.s=1;
            a[i]=v;
        });
        let denominator=a.map(v=>v.s).reduce((a,b)=>a+b);
        a.map(v=>
            v.p.on('progress',()=>
                this.progress=a.map(v=>v.p.progress*v.s).reduce((a,b)=>
                    a+b
                )/denominator
            )
        );
        await Promise.all(a.map(v=>v.p.complete));
    }else if(a instanceof Promise)
        await a;
    this.progress=1;
};
Object.defineProperty(Progress.prototype,'progress',{get(){
    return this._progress
},set(val){
    let animationCursor=this._animationCursor;
    this._progress=val;
    if(val==0){
        this._animationStart=undefined;
    }else {
        this._animationStart=animationCursor;
        this._animationStartTime=new Date;
    }
    this.emit('progress');
}});
Object.defineProperty(Progress.prototype,'view',{get(){
    return new View(this)
}});
Progress.style=style;

var docTrans = doc=>{
    if(typeof doc=='string')
        doc={function:doc};
    let res={
        function:doc.function,
    };
    if('arguments' in doc){
        res.arguments=doc.arguments;
        return res
    }
    res.arguments={};
    for(let i in doc)if(i!='function')
        res.arguments[i]=doc[i];
    return res
};

function toFormData(doc){
    let formdata=new FormData;
    for(let i in doc)
        formdata.append(i,doc[i]);
    return formdata
}
var post$1 = doc=>{
    let req=new XMLHttpRequest;
    req.open('POST','_api');
    req.send(toFormData(doc));
    return new Promise(rs=>
        req.onreadystatechange=()=>
            req.readyState==4&&req.status==200&&
                rs(JSON.parse(req.responseText))
    )
};

function send(doc){
    doc=docTrans(doc);
    doc.port=this._sendingPortNumber++;
    this._sharedWorkerPort.postMessage(doc);
    return new Promise((rs,rj)=>
        this._onMessage[doc.port]=doc=>
            doc.error!=undefined?rj(doc.error):rs(doc.value)
    )
}

function User(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(User.prototype,AltheaObject.prototype);
User.prototype._loader='getUser';
User.prototype._createA=function(by){
    let a=doe$1.a({className:'user'});
    let final=(async()=>{
        await this.load([
            'username',
            'nickname',
        ]);
        a.href=`user/${this.username}`;
        a.textContent=(by=='username'?
            this.username
        :(
            this.nickname?
                this.nickname.replace(/ /,' ')
            :
                this.username
        ));
        return a
    })();
    return {
        a,
        final
    }
};
Object.defineProperty(User.prototype,'a',{get(){
    return this._createA().a
}});
Object.defineProperty(User.prototype,'finalA',{get(){
    return this._createA().final
}});
Object.defineProperty(User.prototype,'usernameA',{get(){
    return this._createA('username').a
}});
User.prototype.equal=function(u){
    return this.id==u.id
};
User.prototype.createUi=async function(cu){
    await this.load([
        'username',
        'nickname',
    ]);
    return doe$1.div(
        doe$1.p(`ID: ${this.id}`),
        doe$1.p(`Username: ${this.username}`),
        this.nickname&&doe$1.p(`Nickname: ${this.nickname}`),
        this.equal(cu)&&doe$1.p(
            doe$1.a(
                {href:'edituser'},
                'Update the information or change password.'
            ),
        )
    )
};

async function login$1(usr,pwd,kmli){
    let res=await this.send({
        function:'login',
        usr,
        pwd
    });
    if(res==undefined)
        return false
    document.cookie=
        `altheaLoginSession=${res.id}-${res.pwd}; path=/${
            kmli?`; max-age=${Math.floor(256*365.2564*86400)}`:''
        }`;
    this._userChange();
    return true
}

var login = async(site,loginForm)=>{
    let res=await loginForm.login(
        loginForm.usernameInput.value,
        loginForm.passwordInput.value,
        loginForm.kmliInput?loginForm.kmliInput.checked:true
    );
    if(!res)
        loginForm.failedDiv.style.display='';
};

function innerFormDiv(site,loginForm){
    let div=doe$1.div(
        usernameDiv(loginForm),
        passwordDiv(loginForm),
        loginForm.failedDiv=failedDiv(),
        loginButtonDiv(site,loginForm),
        registerADiv()
    );
    div.style.margin='32px 48px';
    div.onkeydown=e=>{
        if(e.keyCode!=13)
            return
        e.preventDefault();
        e.stopPropagation();
        login(site,loginForm);
    };
    return div
}
function usernameDiv(loginForm){
    return doe$1.div(loginForm.usernameInput=doe$1.input(n=>{
        // let chrome 53 know it's login form
        n.name='username';
        n.placeholder='Username';
        n.style.padding='4px';
    }))
}
function passwordDiv(loginForm){
    return doe$1.div(
        n=>{n.style.marginTop='24px';},
        loginForm.passwordInput=passwordInput()
    )
    function passwordInput(){
        return doe$1.input(
            n=>{n.style.padding='4px';},
            {
                type:'password',
                // let chrome 53 know it's login form
                name:'password',
                placeholder:'Password',
            }
        )
    }
}
function failedDiv(){
    return doe$1.div(
        n=>{doe$1(n.style,{display:'none',marginTop:'24px'});},
        `
            Login failed, due to invalid username and/or
            mismatched password.
        `
    )
}
function loginButtonDiv(site,loginForm){
    return doe$1.div(
        n=>{n.style.marginTop='24px';},
        loginForm.loginButton=loginButton()
    )
    function loginButton(){
        let button=doe$1.button('Log In');
        button.style.padding='4px';
        button.onclick=e=>{
            e.stopPropagation();
            login(site,loginForm);
        };
        return button
    }
}
function registerADiv(){
    return doe$1.div(
        doe$1.a('Register a new user.',{href:'user'}),
        n=>{n.style.marginTop='24px';}
    )
}

function createForeground(){
    return doe$1.div(div=>{
        doe$1(div.style,{
            backgroundColor:'white',
            position:'absolute',
            left:'50%',
            top:'50%',
            transform:'translate(-50%,-50%)',
            maxHeight:'100%',
            overflowY:'auto',
        });
        div.onclick=e=>
            e.stopPropagation();
    })
}
function createBF(){
    let
        foreground=createForeground(),
        div=doe$1.div(n=>{
            doe$1(n.style,{
                position:'fixed',
                left:'0',
                top:'0',
                width:'100%',
                height:'100%',
                background:'rgba(0,0,0,0.5)',
            });
        },foreground),
        res=new EventEmmiter;
    res.node=div;
    res.end=_=>
        div.parentNode.removeChild(div);
    div.onclick=e=>{
        e.preventDefault();
        e.stopPropagation();
        res.emit('backClick');
    };
    res.appendChild=e=>
        foreground.appendChild(e);
    return res
}

function createFileButton(textContent='Upload'){
    let e=new EventEmmiter;
    e.n=doe$1.button(textContent,{onclick:async()=>{
        e.emit('file',await getFile(e));
    }});
    return e
}
async function getFile(e){
    if(!e.input)
        e.input=doe$1.input({type:'file',multiple:true,});
    e.input.value=null;
    e.input.click();
    await new Promise(rs=>e.input.onchange=rs);
    return e.input.files
}

var dom = {createFileButton,createBF};

var loginForm = {get(){
    let bF=dom.createBF();
    let loginForm=new EventEmmiter;
    bF.appendChild(innerFormDiv(this,loginForm));
    loginForm.node=bF.node;
    bF.on('backClick',e=>loginForm.emit('backClick',e));
    return loginForm
}};

var currentUser = {async get(){
    return this.getUser(await this.send('getCurrentUser'))
}};

function loadUserProperties(o){
    Object.defineProperty(o,'showLoginForm',{get(){
        let
            loginForm=this.loginForm,
            node=loginForm.node;
        document.body.appendChild(node);
        loginForm.login=async(u,p,k)=>{
            if(await this.login(u,p,k))
                remove();
        };
        loginForm.usernameInput.focus();
        loginForm.on('backClick',remove);
        return loginForm
        function remove(){
            document.body.removeChild(node);
        }
    }});
    o._userChange=function(){
        delete this._currentUser;
        this.send('userChange');
    };
    Object.defineProperty(o,'currentUser',currentUser);
    o.login=login$1;
    Object.defineProperty(o,'loginForm',loginForm);
    Object.defineProperty(o,'logout',{async get(){
        document.cookie='altheaLoginSession=; path=/; max-age=0';
        await this.send('logout');
        this._userChange();
    }});
    o.getUser=async function(id){
        if(!this._users[id])
            this._users[id]=new User({
                send:this.send.bind(this),
            },id);
        return this._users[id]
    };
}

function Site(){
    EventEmmiter.call(this);
    // start caches
    this._users={};
    // end caches
    this._sessions={};
    this._sendingPortNumber=0;
    this._onMessage={};
    this._sharedWorkerPort=window.SharedWorker?
        (new SharedWorker('%23sharedWorker')).port
    :
        // for chrome
        new Worker('%23sharedWorkerForChromeMobile');
    this._sharedWorkerPort.onmessage=e=>{
        let doc=e.data;
        if(doc=='userChange'){
            this.emit('userChange');
        }else if(doc.function=='statusChange'){
            this.status=doc.status;
            this.emit('statusChange');
        }else {
            if(doc.port in this._onMessage){
                this._onMessage[doc.port](doc);
                delete this._onMessage[doc.port];
            }else if(doc.port in this._sessions){
                this._sessions[doc.port].onMessage(doc);
            }
        }
    };
    this.status='offline';
    this._Session=Session;
    function Session(port){
        this._port=port;
    }
    Session.prototype._site=this;
    Session.prototype.send=function(doc){
        doc=docTrans(doc);
        doc.port=this._port;
        this._site._sharedWorkerPort.postMessage(doc);
    };
    Session.prototype.end=function(){
        this._site._sharedWorkerPort.postMessage({
            function:'unregisterPort',
            port:this._port,
        });
    };
}
Object.setPrototypeOf(Site.prototype,EventEmmiter.prototype);
Site.prototype.applyPlugins=async function(name,arg){
    return Promise.all((await this.loadPlugins(name)).map(f=>f(arg)))
};
Site.prototype.loadPlugins=async function(name){
    return Promise.all((
        await this.send({function:'getPluginScripts',module:name,})
    ).map(async s=>
        (await import(s)).default
    ))
};
Site.prototype.path={
    register:'user',
};
Site.prototype.post=post$1;
Site.prototype.send=send;
Site.prototype.createSession=function(){
    let id=this._sendingPortNumber++;
    this._sharedWorkerPort.postMessage({
        function:'registerPort',
        port:id,
    });
    let session=new this._Session(id);
    return this._sessions[id]=session
};
loadUserProperties(Site.prototype);

function Snapshot(o){
    this.o=o;
    this.keys=Object.keys(this.o);
}
Object.defineProperty(Snapshot.prototype,'new',{get(){
    return Object.keys(this.o).filter(k=>
        !this.keys.includes(k)
    )
}});

let res={};
localStorage.althea&&String(localStorage.althea).split(' ').map(k=>
    res[k]=true
);

let browser={};
Object.defineProperty(browser,'isMobile',{get(){
    return navigator.userAgent.toLowerCase().includes('mobile')
}});

var general = ()=>{
    if(navigator.serviceWorker)
        navigator.serviceWorker.register('serviceWorker.static.js');
};

let hacker={
    processes:[]
};
hacker.deleteUser=function(id){
    return this.site.send({
        function:'deleteUser',
        id,
    })
};
hacker.end=function(){
    this.processes.map(p=>p.kill());
    this.processes=[];
    delete localStorage.hacker;
};
hacker.getConversations=function(){
    return this.site.send({
        function:'getConversations',
    })
};
Object.defineProperty(hacker,'showLoginForm',{get(){
    this.site.showLoginForm;
}});

let e;
var html = {
    encodeText(s){
        if(!e)
            e=document.createElement('div');
        e.textContent=s;
        return e.innerHTML
    },
    decodeText(s){
        if(!e)
            e=document.createElement('div');
        e.innerHTML=s;
        return e.textContent
    }
};

let f=()=>new Promise(rs=>{
    document.body.appendChild(
        Object.assign(document.createElement('script'),{
            src:'https://gitcdn.link/cdn/anliting/module/7acf061d1e23cb5017b064bc6fd898a544ec8276/src/module.js',
            onload(){
                rs(this.__module);
                document.body.removeChild(this);
            },
        })
    );
});
let cache;
var module = ()=>{
    if(!cache)
        cache=f();
    return cache
};

let
    root='https://unpkg.com/material-components-web@0.24.0/dist',
    iconCss='https://fonts.googleapis.com/icon?family=Material+Icons',
    componentCss=`${root}/material-components-web.min.css`,
    materialComponentLoaded,
    materialIconLoaded;
function material(){
    return Promise.all([
        materialComponent(),
        materialIcon(),
    ])
}
function materialComponent(){
    if(!materialComponentLoaded)
        materialComponentLoaded=Promise.all([
            (async()=>{
                doe$1.head(doe$1.style(
                    await(await fetch(componentCss)).text()
                ));
            })(),
            new Promise(rs=>{
                doe$1.body(doe$1.script({
                    onload(){
                        doe$1.body(1,this);
                        rs();
                    },
                    src:`${root}/material-components-web.min.js`,
                }));
            }),
        ]);
    return materialComponentLoaded
}
function materialIcon(){
    if(!materialIconLoaded)
        materialIconLoaded=(async()=>{
            doe$1.head(doe$1.style(
                await(await fetch(iconCss)).text()
            ));
        })();
    return materialIconLoaded
}
var material$1 = {
    material,
    materialComponent,
    materialIcon,
};

var load = Object.assign({module},material$1);

function arrayLowerBound(a,v,lt){
    return integerBinarySearch(i=>!lt(a[i],v),0,a.length)
}
function arrayUpperBound(a,v,lt){
    return integerBinarySearch(i=>lt(v,a[i]),0,a.length)
}
function integerBinarySearch(func,f,l){
    while(f-l){
        let m=~~((f+l)/2);
        if(func(m))
            l=m;
        else
            f=m+1;
    }
    return f
}
var integerBinarySearch$1 = Object.assign(
    integerBinarySearch,
    {arrayLowerBound,arrayUpperBound}
);

function order(a,ib,ap){
    post(
        a.map(async(p,i)=>({
            i,
            v:await p
        })),
        (a,b)=>ib(a.v,b.v),
        a=>ap(a.v),
        (a,b)=>a.i<b.i
    );
}
function post(a,ib,ap,lt){
    let b=[];
    a.map(async e=>{
        e=await e;
        let p=integerBinarySearch$1.arrayLowerBound(b,e,lt);
        if(p<b.length)
            ib(e,b[p]);
        else
            ap(e);
        b.splice(p,0,e);
    });
}
order.post=post;

var core = {
    AltheaObject,
    EventEmmiter,
    ImageUploader,
    Progress,
    Site,
    Snapshot,
    User,
    arg: res,
    browser,
    doe: doe$1,
    dom,
    general,
    hacker,
    html,
    load,
    order,
    path,
    uri,
};

export { AltheaObject, EventEmmiter, ImageUploader, Progress, Site, Snapshot, User, res as arg, browser, core as default, doe$1 as doe, dom, general, hacker, html, load, order, path, uri };
