const { StatusCodes } = require('http-status-codes');
const Payment = require('../models/Payment');
const User = require('../models/User');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');
const nodemailer = require('nodemailer');

const getAllPayments = async (req, res) => {
  const payment = await Payment.find({}).populate({
    path: 'user',
    select: 'phone referID',
  });
  res.status(StatusCodes.OK).json({ payment, count: payment.length });
};

const createPayment = async (req, res) => {

  req.body.user = req.user.userId;

  const payment = await Payment.create(req.body);
  const {
    senderName,
    investmentAmount,
    dailyPercentage,
    totalPercentage,
    investmentName,
    status,
    _id: id,
    user,
  } = payment;

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
    subject: 'Payment Approval Request',
    html: `<div>
      <h2 style="
      font-weight: bold; 
      text-align: center;
      "><span style="
      text-transform: capitalize;
      ">${senderName}</span> just made payment of ₦${investmentAmount} for ${investmentName}. Please cofirm payment with the link below</h2>
      <p style="font-weight: bold; text-align: center"><a type="button" href="http://localhost:2200/paymentConfirm?id=${id}" style="
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
      cursor: pointer;">Cofirm Payment</a></p>
      
      </div>
      `,
  });

  res.status(StatusCodes.CREATED).json({ payment, info });
};

const getSinglePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id ${paymentId}`);
  }
  res.status(StatusCodes.OK).json({ payment });
};

const updatePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const {
    senderName,
    investmentAmount,
    dailyPercentage,
    totalPercentage,
    investmentName,
    status,
  } = req.body;
  const payment = await Payment.findOneAndUpdate(
    { _id: paymentId },
    {
      senderName,
      investmentAmount,
      dailyPercentage,
      totalPercentage,
      investmentName,
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id ${paymentId}`);
  }

  checkPermissions(req.user, payment.user);

  res.status(StatusCodes.OK).json({ payment });
};

const deletePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id ${paymentId}`);
  }

  checkPermissions(req.user, payment.user);

  await payment.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'Success, Payment removed' });
};

const getUserPayment = async (req, res) => {
  const { id: userId } = req.params;
  const payment = await Payment.find({ user: userId });
  
  const totalInvestment = payment.reduce((acc, curr) => {
    return acc + curr.investmentAmount
    
  }, 0)
  

  const dailyEarning = payment.reduce((acc, curr) => {
    const calc = curr.investmentAmount * curr.dailyPercentage / 100
    return acc + calc
  }, 0)

  const totalInvestmentCalc = payment.map((item) => {
    let invest = 0
    if(item.status === 'pending'){
      let curInvestment = item.investmentAmount
      
      const calculate = totalInvestment - curInvestment
      invest = calculate
    }
    if(item.status === 'paid'){
      invest = totalInvestment
    }
    return invest
  },0)


  const dailyEarningCalc = payment.map((item) => {
    let invest = 0
    if(item.status === 'pending'){
      let curEarning = item.investmentAmount * item.dailyPercentage / 100
      const calculate = dailyEarning - curEarning
      invest = calculate
    }
    if(item.status === 'paid'){
      invest = dailyEarning
    }
    return invest
  },0)


  

  res.status(StatusCodes.OK).json({ payment, totalInvestment, totalInvestmentCalc , dailyEarning, dailyEarningCalc, count: payment.length });
};

module.exports = {
  getAllPayments,
  createPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
  getUserPayment,
};

