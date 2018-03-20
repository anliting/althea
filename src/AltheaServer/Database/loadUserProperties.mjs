import deleteUser from              './loadUserProperties/deleteUser'
import getCurrentUser from          './loadUserProperties/getCurrentUser'
import getCurrentUserByRequest from
    './loadUserProperties/getCurrentUserByRequest'
import getSession from              './loadUserProperties/getSession'
import getUser from                 './loadUserProperties/getUser'
import getUsers from                './loadUserProperties/getUsers'
import getUserIdByUsername from
    './loadUserProperties/getUserIdByUsername'
import newUser from                 './loadUserProperties/newUser'
import login from                   './loadUserProperties/login'
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
