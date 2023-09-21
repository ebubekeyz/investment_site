const express = require('express')
const router = express.Router()

const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    getAllBankInfo,
    createBankInfo,
    getSingleBankInfo,
    updateBankInfo,
    deleteBankInfo,
    getUserBankInfo,
  } = require('../controllers/bankInfoController');

router.route('/').post(authenticateUser, createBankInfo).get(authenticateUser, getAllBankInfo)
router.route('/:id').get(authenticateUser, getSingleBankInfo).patch(authenticateUser, updateBankInfo).delete(authenticateUser, deleteBankInfo)
router.route('/:id/bankInfo').get(authenticateUser, getUserBankInfo)


module.exports = router