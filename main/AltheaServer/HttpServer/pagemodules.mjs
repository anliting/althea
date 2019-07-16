import s400 from            './pagemodules/400.mjs'
import s403 from            './pagemodules/403.mjs'
import s404 from            './pagemodules/404.mjs'
import s500 from            './pagemodules/500.mjs'
import api from             './pagemodules/api.mjs'
import controlPanel from    './pagemodules/controlPanel.mjs'
export default{
    s400,
    s403,
    s404,
    s500,
    '/_api':api,
    '/control-panel':controlPanel,
}
