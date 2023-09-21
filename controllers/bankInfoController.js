const { StatusCodes } = require('http-status-codes');
const BankInfo = require('../models/BankInfo');
const User = require('../models/User');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const getAllBankInfo = async (req, res) => {
  const bankInfo = await BankInfo.find({}).populate({
    path: 'user',
    select: 'phone referID',
  });
  res.status(StatusCodes.OK).json({ bankInfo, count: bankInfo.length });
};

const createBankInfo = async (req, res) => {
  req.body.user = req.user.userId;

  const bankInfo = await BankInfo.create(req.body);

  res.status(StatusCodes.CREATED).json({ bankInfo });
};

const getSingleBankInfo = async (req, res) => {
  const { id: bankInfoId } = req.params;
  const bankInfo = await BankInfo.findOne({ _id: bankInfoId });
  if (!bankInfo) {
    throw new CustomError.NotFoundError(`No bankInfo with id ${bankInfoId}`);
  }
  res.status(StatusCodes.OK).json({ bankInfo });
};

const updateBankInfo = async (req, res) => {
  const { id: bankInfoId } = req.params;
  const { realName, bankCode, bankAccount } = req.body;
  const bankInfo = await BankInfo.findOneAndUpdate(
    { _id: bankInfoId },
    {
      realName,
      bankCode,
      bankAccount,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!bankInfo) {
    throw new CustomError.NotFoundError(`No bankInfo with id ${bankInfoId}`);
  }

  checkPermissions(req.user, bankInfo.user);

  res.status(StatusCodes.OK).json({ bankInfo });
};

const deleteBankInfo = async (req, res) => {
  const { id: bankInfoId } = req.params;
  const bankInfo = await BankInfo.findOne({ _id: bankInfoId });
  if (!bankInfo) {
    throw new CustomError.NotFoundError(`No bankInfo with id ${bankInfoId}`);
  }

  checkPermissions(req.user, bankInfo.user);

  await bankInfo.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'Success, BankInfo removed' });
};

const getUserBankInfo = async (req, res) => {
  const { id: userId } = req.params;
  const bankInfo = await BankInfo.find({ user: userId });
  res.status(StatusCodes.OK).json({ bankInfo });
};

module.exports = {
  getAllBankInfo,
  createBankInfo,
  getSingleBankInfo,
  updateBankInfo,
  deleteBankInfo,
  getUserBankInfo,
};
