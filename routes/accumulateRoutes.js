const express = require('express')

const router = express.Router()

const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
  getAccUserIncome,
  createAccumulatedIncome
  } = require('../controllers/accumulateController');

router.route('/').post(authenticateUser, createAccumulatedIncome)

router.route('/:id/accumulate').get(authenticateUser, getAccUserIncome)


module.exports = router