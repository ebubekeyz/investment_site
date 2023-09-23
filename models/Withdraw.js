const mongoose = require('mongoose')

const WithdrawSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    withdrawalAmount: {
        type: Number,
        required: true
    },
    withdrawalTax: {
        type: Number,
        required: true
    },
    mainWithdrawal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['processing','succeeded'],
        default: 'processing',
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Withdraw', WithdrawSchema)