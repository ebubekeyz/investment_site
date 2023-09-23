const Withdraw = require('../models/Withdraw')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const nodemailer = require('nodemailer');


const createWithdrawal = async (req, res) => {
    req.body.user = req.user.userId
    
    if(req.body.withdrawalAmount < 2000){
        throw new CustomError.BadRequestError('You cannot withdraw amount less than 2000')
    }

    const withdraw = await Withdraw.create(req.body)

    res.status(StatusCodes.CREATED).json({withdraw})
}

const getAllWithdrawals = async (req, res) => {
    const withdraw = await Withdraw.find({}).populate({
        path: 'user',
        select: 'phone referID'
    })
    res.status(StatusCodes.OK).json({withdraw, count: withdraw.length})
}

const getUserWithdrawal = async (req, res) => {
    const {id: userId} = req.params
    const withdraw = await Withdraw.find({user: userId})
    res.status(StatusCodes.OK).json({withdraw})
}

const getSingleWithdrawal = async(req, res) => {
    const {id: withdrawId} = req.params
    
    const withdraw = await Withdraw.findOne({_id: withdrawId})
    if(!withdraw){
        throw new CustomError.BadRequestError(`No withdrawal id with id ${withdrawId}`)
    }

    res.status(StatusCodes.OK).json({withdraw})
}


const updateWithdrawal = async (req, res) => {
    const {accountName, accountNumber, withdrawalAmount, withdrawalTax, mainWithdrawal} = req.body

    const {id: withdrawId} = req.params

    const withdraw = await Withdraw.findOneAndUpdate({_id: withdrawId}, {accountName, accountNumber, withdrawalAmount, withdrawalTax, mainWithdrawal}, {
        new: true,
        runValidators: true
    })

    if(!withdraw){
        throw new CustomError.BadRequestError(`No withdrawal id with id ${withdrawId}`)
    }

    res.status(StatusCodes.OK).json({withdraw})
}


const deleteWithdrawal = async(req, res) => {
    const {id: withdrawId} = req.params
    
    const withdraw = await Withdraw.findOne({_id: withdrawId})
    if(!withdraw){
        throw new CustomError.BadRequestError(`No withdrawal id with id ${withdrawId}`)
    }

    await withdraw.deleteOne()

    res.status(StatusCodes.OK).json({msg: 'withdrawals successfully deleted'})
}


module.exports = {
    createWithdrawal,
    getAllWithdrawals,
    getUserWithdrawal,
    getSingleWithdrawal,
    updateWithdrawal,
    deleteWithdrawal
}