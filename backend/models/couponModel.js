const mongoose = require('mongoose')

const Schema = mongoose.Schema

const couponSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Coupon', couponSchema)