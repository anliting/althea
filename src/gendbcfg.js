let
    fs=require('fs'),
    rl=require('readline').createInterface({
        input:process.stdin,
        output:process.stdout
    }),
    ask=s=>new Promise(rs=>rl.question(s,rs))
;(async()=>{
    fs.createWriteStream('dbconfig',{mode:0o600}).end(JSON.stringify({
        host:       await ask('Host (default \'localhost\'): ')||'localhost',
        user:       await ask('User (default \'root\'): ')||'root',
        password:   await ask('Password (default \'\'): ')||'',
        database:   await ask('Database (default \'althea\'): ')||'althea',
    }))
    rl.close()
})()
