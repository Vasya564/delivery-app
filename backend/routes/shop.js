const express = require('express')

// controller functions
const { 
    getShops, 
    getShop, 
    createShop, 
    deleteShop} = require('../controllers/shopController')

const router = express.Router()

// GET all shops
router.get('/', getShops)

// GET specific shop
router.get('/:id', getShop)

// CREATE shop
router.post('/create', createShop)

// DELETE shop
router.delete('/:id', deleteShop)

module.exports = router