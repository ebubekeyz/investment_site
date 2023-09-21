const express = require('express')
const router = express.Router()

const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')
const uploadImage = require('../controllers/uploadImageController')

router.route('/').post([authenticateUser, authenticatePermissions('admin')], uploadImage)

module.exports = router