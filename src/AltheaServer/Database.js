let
    databaseConnector=  require('./Database/databaseConnector'),
    edges=              require('./Database/edges')
module.exports=Database
function Database(dbconfig){
/*
Using <code>this._dbconfig=Object.create(dbconfig)</code> instead of <code>this._dbconfig=dbconfig</code> prevent <code>dbconfig</code> to be printed when <code>console.log(this)</code>.
*/
    this._dbconfig=Object.create(dbconfig)
    this.pool=databaseConnector({
        host:       this._dbconfig.host,
        user:       this._dbconfig.user,
        password:   this._dbconfig.password,
        database:   this._dbconfig.database,
    })
    this.load=(async()=>{
        for(;;)try{
            let ver=await this._getVersion()
            while(ver in edges)
                ver=await edges[ver](this)
            await this._setVersion(ver)
            break
        }catch(e){
            if(e.code!='ECONNREFUSED')
                throw e
            await new Promise(rs=>setTimeout(rs,1e3))
        }
    })()
}
Database.prototype._getVersion=
    require('./Database/prototype._getVersion')
Database.prototype._setVersion=
    require('./Database/prototype._setVersion')
require('./Database/loadTransactionProperties')(Database.prototype)
require('./Database/loadUserProperties')(Database.prototype)
Database.prototype.constants=
    require('./Database/prototype.constants')
Database.prototype.getEnvironmentvariables=
    require('./Database/prototype.getEnvironmentvariables')
Database.prototype.getPlugin=
    require('./Database/prototype.getPlugin')
Database.prototype.getPlugins=
    require('./Database/prototype.getPlugins')
Database.prototype.newImage=
    require('./Database/prototype.newImage')
Database.prototype.selectActivatedPlugins=
    require('./Database/prototype.selectActivatedPlugins')
Database.prototype.updateEnvironmentvariableById=
    require('./Database/prototype.updateEnvironmentvariableById')
Database.prototype.updatePlugin=
    require('./Database/prototype.updatePlugin')
