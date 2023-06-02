const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    address: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    products: [{
        photo: String,
        name: String,
        price: Number,
        quantity: Number
    }]
})

module.exports = mongoose.model('Order', orderSchema)