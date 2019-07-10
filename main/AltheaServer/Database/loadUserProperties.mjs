import deleteUser from              './loadUserProperties/deleteUser.mjs'
import getCurrentUser from
    './loadUserProperties/getCurrentUser.mjs'
import getCurrentUserByRequest from
    './loadUserProperties/getCurrentUserByRequest.mjs'
import getSession from              './loadUserProperties/getSession.mjs'
import getUser from                 './loadUserProperties/getUser.mjs'
import getUsers from                './loadUserProperties/getUsers.mjs'
import getUserIdByUsername from
    './loadUserProperties/getUserIdByUsername.mjs'
import newUser from                 './loadUserProperties/newUser.mjs'
import login from                   './loadUserProperties/login.mjs'
export default db=>{
    db.deleteUser=deleteUser
    db.getCurrentUser=getCurrentUser
    db.getCurrentUserByRequest=getCurrentUserByRequest
    db.getSession=getSession
    db.getUser=getUser
    db.getUsers=getUsers
    db.getUserIdByUsername=getUserIdByUsername
    db.newUser=newUser
    db.login=login
}
