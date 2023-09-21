const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {attachCookiesToResponse, createTokenUser} = require('../utils')

const register = async (req, res) => {
    let {phone, password, referID, confirmPassword} = req.body

    // const {id: userId} = req.params

    // const existId = await User.findOne({_id: userId})
    // console.log(existId)

    // if(!existId){
    //     throw new BadRequestError('No referer exist')
    // } else {
    //     referID === existId
    // }

    const phoneExist = await User.findOne({phone})
    if(phoneExist){
        throw new BadRequestError('phone number already exist')
    }
    if(!phone || !password || !referID){
        throw new BadRequestError('fields must not be empty')
    }

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({phone, password, referID, role})

    const tokenUser = createTokenUser(user)

    attachCookiesToResponse({res, user: tokenUser})

    res.status(StatusCodes.CREATED).json({user: tokenUser})
}


const login = async (req, res) => {
    const {phone, password} = req.body

    if(!phone || !password){
        throw new BadRequestError('phone or Passowrd should not be empty')
    }

    const user = await User.findOne({phone})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Password does not match')
    }

    const tokenUser = createTokenUser(user)

    attachCookiesToResponse({res, user: tokenUser})

    res.status(StatusCodes.OK).json({user: tokenUser})
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })

    res.status(StatusCodes.OK).json({msg: 'user logged out'})
    // res.status(StatusCodes.OK).redirect('/')
   
}

module.exports = {
    register,
    login,
    logout
}