/*
http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
*/
let
    statusname={
        400:'Bad Request',
        403:'Forbidden',
        404:'Not Found',
        500:'Internal Server Error',
    },
    statuscontent={
        400:`
            The request could not be understood by the server
            due to malformed syntax.
        `,
        403:`
            The server understood the request,
            but is refusing to fulfill it.
            Authorization will not help
            and the request SHOULD NOT be repeated.
        `,
        404:`
            The server has not found anything matching the Request-URI.
        `,
        500:`
            The server encountered an unexpected condition
            which prevented it from fulfilling the request.
        `,
    }
export default env=>{
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:env.statuscode,
        headers:env.headers,
        content:`
<!doctype html>
<base href=/>
<title>${statusname[env.statuscode]}</title>
<meta name=viewport content='width=device-width,initial-scale=1'>
<link rel=stylesheet href=lib/responseerror.css>
<h1>${statusname[env.statuscode]}</h1>
<p>${statuscontent[env.statuscode]}
<p>If you think this is a server error, 
please contact the <a href=mailto:anlialtting@gmail.com>webmaster</a>.
<h2>Error ${env.statuscode}</h2>
<p><a href=https://anliting.com/althea>Althea</a>
    unreleased version.
`
    }
}
