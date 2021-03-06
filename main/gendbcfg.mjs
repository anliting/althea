import fs from 'fs'
import readline from 'readline'
let
    rl=readline.createInterface({
        input:process.stdin,
        output:process.stdout
    }),
    ask=s=>new Promise(rs=>rl.question(s,rs))
;(async()=>{
    fs.createWriteStream('dbconfig',{mode:0o600}).end(JSON.stringify({
        host:       await ask('Host (default \'::1\'): ')||'::1',
        user:       await ask('User (default \'root\'): ')||'root',
        password:   await ask('Password (default \'\'): ')||'',
        database:   await ask('Database (default \'althea\'): ')||'althea',
    }))
    rl.close()
})()
