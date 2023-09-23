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
    const {_id: withdrawId, user, status, accountName, accountNumber, withdrawalAmount, withdrawalTax, mainWithdrawal} = withdraw
    console.log(accountName)

    const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Teck Company" <test@gmail.com>`,
    to: 'ebubeofforjoe@gmail.com',
    subject: 'Withdrawal Request',
    html: `
    <div>

    <div style="display: flex; justify-content: space-around">
    <p style="font-weight: 700">Account Name:</p>
     <span>${accountName}</span>
    </div>

    <div style="display: flex; justify-content: space-around">
    <p style="font-weight: 700">Account Number:</p>
     <span>${accountNumber}</span>
    </div>

    <div style="display: flex; justify-content: space-around">
    <p style="font-weight: 700">Main Withdrawal:</p>
     <span>${mainWithdrawal}</span>
    </div>

    <div style="display: flex; justify-content: space-around">
    <p style="font-weight: 700">Status:</p>
     <span>${status}</span>
    </div>
    
    
    
    <p style="font-weight: bold; text-align: center"><a type="button" href="https://investment-site.onrender.com/confirmWithdrawal?id=${withdrawId}" style="
    text-align: center;  
    background: hsl(21, 62%, 45%);
    color: white;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    display: inline-block;
    transition: all 0.3s linear;
    border-color: transparent;
    cursor: pointer;">Cofirm Withrawal</a></p>
    </div>
    `,
  });

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