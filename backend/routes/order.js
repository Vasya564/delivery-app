const express = require('express')

// controller functions
const { getOrders, createOrder } = require('../controllers/orderController')

const router = express.Router()

// GET all orders
router.get('/', getOrders)

// CREATE order
router.post('/create', createOrder)

module.exports = router