const express = require('express')

const router = express.Router()

const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    getAllPayments,
    createPayment,
    getSinglePayment,
    updatePayment,
    deletePayment,
    getUserPayment,
  } = require('../controllers/paymentController');

router.route('/').post(authenticateUser, createPayment).get(authenticateUser, getAllPayments)
router.route('/:id').get(authenticateUser, getSinglePayment).patch(authenticateUser, updatePayment).delete(authenticateUser, deletePayment)
router.route('/:id/payment').get(authenticateUser, getUserPayment)


module.exports = router