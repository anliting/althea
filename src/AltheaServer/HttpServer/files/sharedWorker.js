import Client from './lib/sharedWorker/Client.js'
let client=new Client
onconnect=e=>client.register(e.ports[0])
