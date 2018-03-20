import databaseConnector from   './Database/databaseConnector'
import edges from               './Database/edges'
import _getVersion from         './Database/prototype._getVersion'
import _setVersion from         './Database/prototype._setVersion'
import loadTransactionProperties from
    './Database/loadTransactionProperties'
import loadUserProperties from  './Database/loadUserProperties'
import constants from           './Database/prototype.constants'
import getEnvironmentvariables from
    './Database/prototype.getEnvironmentvariables'
import getPlugin from           './Database/prototype.getPlugin'
import getPlugins from          './Database/prototype.getPlugins'
import newImage from            './Database/prototype.newImage'
import selectActivatedPlugins from
    './Database/prototype.selectActivatedPlugins'
import updateEnvironmentvariableById from
    './Database/prototype.updateEnvironmentvariableById'
import updatePlugin from        './Database/prototype.updatePlugin'
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
Database.prototype._getVersion=_getVersion
Database.prototype._setVersion=_setVersion
loadTransactionProperties(Database.prototype)
loadUserProperties(Database.prototype)
Database.prototype.constants=constants
Database.prototype.getEnvironmentvariables=getEnvironmentvariables
Database.prototype.getPlugin=getPlugin
Database.prototype.getPlugins=getPlugins
Database.prototype.newImage=newImage
Database.prototype.selectActivatedPlugins=selectActivatedPlugins
Database.prototype.updateEnvironmentvariableById=
    updateEnvironmentvariableById
Database.prototype.updatePlugin=updatePlugin
export default Database
