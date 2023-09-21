const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { checkPermissions } = require('../utils')

const getAllProducts = async (req, res) => {
    const product = await Product.find({})
    if(!product){
        throw new  BadRequestError('No product was found')
    }
    res.status(StatusCodes.OK).json({product, count: product.length})
}

const createProduct = async (req, res) => {
    const { investment, dailyDividend, dailyDividendPercentage, totalDividend, totalDividendPercentage, cycle, image, name } = req.body
    if(!investment || !dailyDividend || !dailyDividendPercentage || !totalDividend || !totalDividendPercentage || !cycle || !image || !name){
        throw new BadRequestError('Please no field should be empty')
    }
    const product = await Product.create({investment, dailyDividend, dailyDividendPercentage, totalDividend,totalDividendPercentage, cycle, image, name})
    res.status(StatusCodes.CREATED).json({product})
}

const getSingleProduct = async(req, res) => {
    const {id: productId} = req.params

    const product = await Product.findOne({_id: productId})

    if(!product){
        throw new BadRequestError(`No product with id: ${productId}`)
    }

    checkPermissions(req.user, product._id)

    res.status(StatusCodes.OK).json({product})
}


const updateProduct = async (req, res) => {
        const {investment, dailyDividend, dailyDividendPercentage, totalDividend, totalDividendPercentage, cycle, image, name} = req.body

        const { id: productId } = req.params

        const product = await Product.findOneAndUpdate({_id: productId }, {investment, dailyDividend, dailyDividendPercentage, totalDividend, totalDividendPercentage, cycle, image, name}, {
            new: true,
            runValidators: true
        })

        if(!product){
            throw new BadRequestError(`No product with id: ${productId}`)
        }
    
        res.status(StatusCodes.OK).json({product})
    }

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct
}