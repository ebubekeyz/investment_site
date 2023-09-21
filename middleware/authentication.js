const CustomError = require('../errors')
const {isTokenValid} = require('../utils')
const path = require('path')

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
        // res.redirect('/')
    } 
    try{
        const {phone, userId, referID, role} = isTokenValid({token})
        req.user = {phone, userId, referID, role}
        next()

    } catch(error){
        // throw new CustomError.UnauthenticatedError('Authentication Invalid')
        res.redirect('/')
    }
    
}

// const authenticatePermissions = (req, res, next) => {
//     if(req.user.role !== 'admin'){
//         throw new CustomError.UnauthorizedError('Not Permitted')
//     }
//     next()
// }


const authenticatePermissions = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            // throw new CustomError.UnauthorizedError('Not Permitted')
            res.redirect('/')
        }
        next()
    }
}
module.exports = {
    authenticateUser,
    authenticatePermissions
}