const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coords: {
        lat: Number,
        lng: Number
    },
    products: [{
        photo: {
            data: Buffer,
            contentType: String
        },
        name: String,
        price: Number,
        quantity: Number
    }]
})

module.exports = mongoose.model('Shop', shopSchema)