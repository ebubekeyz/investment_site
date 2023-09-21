const mongoose = require('mongoose')

const BankInfoSchema = new mongoose.Schema({
    realName: {
        type: String,
        required: true
    },
    bankCode: {
        type: String,
        require: true
    },
    bankAccount: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('BankInfo', BankInfoSchema)