const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    investment: {
        type: Number,
        required: true
    },
    dailyDividend: {
        type: String,
        required: true
    },
    dailyDividendPercentage: {
        type: Number,
        required: true
    },
    totalDividend: {
        type: String,
        required: true
    },
    totalDividendPercentage: {
        type: Number,
        required: true
    },
    cycle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)