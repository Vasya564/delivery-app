const Coupon = require('../models/couponModel')

// get all coupons
const getCoupons = async (req, res) => {
    const coupons = await Coupon.find({})

    res.status(200).json(coupons)
}

// create coupon
const createCoupon = async (req, res) => {
    const { name, code, percentage } = req.body

    try {
        const coupon = await Coupon.create({ name, code, percentage})

        res.status(200).json(coupon)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getCoupons, createCoupon }