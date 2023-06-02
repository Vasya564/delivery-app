const express = require('express')

// controller functions
const { getCoupons, createCoupon } = require('../controllers/couponController')

const router = express.Router()

// GET all coupons
router.get('/', getCoupons)

// CREATE coupon
router.post('/create', createCoupon)

module.exports = router