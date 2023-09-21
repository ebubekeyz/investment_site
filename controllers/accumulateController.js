const { StatusCodes } = require('http-status-codes');
const Accumulate = require('../models/Accumulate');
const User = require('../models/User');
const CustomError = require('../errors');

const createAccumulatedIncome = async (req, res) => {
  req.body.user = req.user.userId;
  const accumulate = await Accumulate.create(req.body);

  res.status(StatusCodes.CREATED).json({ accumulate });
};

const getAccUserIncome = async (req, res) => {
  const { id: userId } = req.params;
  const accumulate = await Accumulate.find({ user: userId });

  const totalAccumulatedAmount = accumulate.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  res.status(StatusCodes.OK).json({ accumulate, totalAccumulatedAmount });
};

module.exports = {
  getAccUserIncome,
  createAccumulatedIncome,
};
