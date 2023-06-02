const Order = require('../models/orderModel')

// get all orders
const getOrders = async (req, res) => {
    const orders = await Order.find({})

    res.status(200).json(orders)
}

// create order
const createOrder = async (req, res) => {
    const { address, name, email, phone, products, totalPrice } = req.body

    try {
        const order = await Order.create({address, name, email, phone, products, totalPrice})

        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getOrders, createOrder }