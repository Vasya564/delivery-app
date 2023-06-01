const express = require('express')
const multer = require('multer');

// controller functions
const { 
    getShops, 
    getShop, 
    createShop, 
    deleteShop} = require('../controllers/shopController')

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all shops
router.get('/', getShops)

// GET specific shop
router.get('/:id', getShop)

// CREATE shop
router.post('/create', upload.single('photo'), createShop)

// DELETE shop
router.delete('/:id', deleteShop)

module.exports = router