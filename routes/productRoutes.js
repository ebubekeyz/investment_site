const express = require('express')
const router = express.Router()

const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct
} = require('../controllers/productController')


router.route('/').get(authenticateUser, getAllProducts).post(authenticateUser, createProduct)
router.route('/:id').get(authenticateUser, getSingleProduct).patch(authenticateUser, updateProduct)

module.exports = router