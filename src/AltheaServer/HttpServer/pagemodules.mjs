import s400 from            './pagemodules/400'
import s403 from            './pagemodules/403'
import s404 from            './pagemodules/404'
import s500 from            './pagemodules/500'
import api from             './pagemodules/api'
import controlPanel from    './pagemodules/controlPanel'
export default{
    s400,
    s403,
    s404,
    s500,
    '/_api':api,
    '/control-panel':controlPanel,
}
