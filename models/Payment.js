const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    investmentAmount: {
        type: Number,
        required: true
    },
    dailyPercentage: {
        type: Number,
        required: true
    },
    totalPercentage: {
        type: Number,
        required: true
    },
    investmentName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','paid'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps: true})



module.exports = mongoose.model('Payment', PaymentSchema)