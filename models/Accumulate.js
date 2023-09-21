const mongoose = require('mongoose')

const AccumulateSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Accumulate', AccumulateSchema)

