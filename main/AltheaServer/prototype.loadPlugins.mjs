import pluginManager from './prototype.loadPlugins/pluginManager.mjs'
export default async function(){
    let plugins=(await Promise.all([
        this.ensureDirectory(this.config.pathToPlugins),
        this.database.getPlugins(),
    ]))[1]
    return pluginManager.loadPlugins(this,plugins)
}
