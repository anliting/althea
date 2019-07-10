import deleteUser from          './queryFunctions/deleteUser.mjs'
import getCurrentUser from      './queryFunctions/getCurrentUser.mjs'
import getEnvironmentvariables from
    './queryFunctions/getEnvironmentvariables.mjs'
import getPluginScripts from    './queryFunctions/getPluginScripts.mjs'
import getPlugins from          './queryFunctions/getPlugins.mjs'
import getUser from             './queryFunctions/getUser.mjs'
import getUserByUsername from   './queryFunctions/getUserByUsername.mjs'
import getUsers from            './queryFunctions/getUsers.mjs'
import newImage from            './queryFunctions/newImage.mjs'
import newUser from             './queryFunctions/newUser.mjs'
import updateEnvironmentvariableById from
    './queryFunctions/updateEnvironmentvariableById.mjs'
import updatePluginById from    './queryFunctions/updatePluginById.mjs'
import updateUser from          './queryFunctions/updateUser.mjs'
import login from               './queryFunctions/login.mjs'
import logout from              './queryFunctions/logout.mjs'
export default{
    deleteUser,
    getCurrentUser,
    getEnvironmentvariables,
    getPluginScripts,
    getPlugins,
    getUser,
    getUserByUsername,
    getUsers,
    newImage,
    newUser,
    updateEnvironmentvariableById,
    updatePluginById,
    updateUser,
    login,
    logout,
}
