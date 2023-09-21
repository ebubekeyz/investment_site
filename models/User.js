const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: [true,'Please phone number length should not be less than 10'],
        minlength: 10
    },

    password: {
        type: String,
        required: [true, 'Password length should not be less than 6'], 
    },

    referID: {
        type: String,
        required: [true, 'Please provide referer ID']
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


UserSchema.methods.comparePassword = async function(candidatePassword){
    const isWait = await bcrypt.compare(candidatePassword, this.password)
    return isWait
}

module.exports = mongoose.model('User', UserSchema)