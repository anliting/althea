import databaseConnector from   './Database/databaseConnector.mjs'
import edges from               './Database/edges.mjs'
import _getVersion from         './Database/prototype._getVersion.mjs'
import _setVersion from         './Database/prototype._setVersion.mjs'
import loadTransactionProperties from
    './Database/loadTransactionProperties.mjs'
import loadUserProperties from  './Database/loadUserProperties.mjs'
import constants from           './Database/prototype.constants.mjs'
import getEnvironmentvariables from
    './Database/prototype.getEnvironmentvariables.mjs'
import getPlugin from           './Database/prototype.getPlugin.mjs'
import getPlugins from          './Database/prototype.getPlugins.mjs'
import newImage from            './Database/prototype.newImage.mjs'
import selectActivatedPlugins from
    './Database/prototype.selectActivatedPlugins.mjs'
import updateEnvironmentvariableById from
    './Database/prototype.updateEnvironmentvariableById.mjs'
import updatePlugin from        './Database/prototype.updatePlugin.mjs'
function Database(dbconfig){
    this._dbconfig=dbconfig
    this._status='start'
    this.pool=databaseConnector({
        host:       this._dbconfig.host,
        user:       this._dbconfig.user,
        password:   this._dbconfig.password,
        database:   this._dbconfig.database,
    })
    this.load=(async()=>{
        for(;this._status=='start';)try{
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
Database.prototype._getVersion=_getVersion
Database.prototype._setVersion=_setVersion
Database.prototype.constants=constants
Database.prototype.end=async function(){
    this._status='end'
    await this.load
    return this.pool.end()
}
Database.prototype.getEnvironmentvariables=getEnvironmentvariables
Database.prototype.getPlugin=getPlugin
Database.prototype.getPlugins=getPlugins
Database.prototype.newImage=newImage
Database.prototype.selectActivatedPlugins=selectActivatedPlugins
Database.prototype.updateEnvironmentvariableById=
    updateEnvironmentvariableById
Database.prototype.updatePlugin=updatePlugin
loadTransactionProperties(Database.prototype)
loadUserProperties(Database.prototype)
export default Database
