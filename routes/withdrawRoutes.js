const express = require('express')
const router = express.Router()
const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    createWithdrawal,
    getAllWithdrawals,
    getUserWithdrawal,
    getSingleWithdrawal,
    updateWithdrawal,
    deleteWithdrawal
} = require('../controllers/withdrawController')

router.route('/').get(authenticateUser, getAllWithdrawals).post(authenticateUser, createWithdrawal)
router.route('/:id').get(authenticateUser, getSingleWithdrawal).patch(authenticateUser, updateWithdrawal).delete(authenticateUser, deleteWithdrawal)
router.route('/:id/withdrawal').get(authenticateUser, getUserWithdrawal)

module.exports = router