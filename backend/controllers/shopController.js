const Shop = require('../models/shopModel')
const mongoose = require('mongoose')

// get all shops
const getShops = async (req, res) => {
    const shops = await Shop.find({})

    res.status(200).json(shops)
}

// get shop
const getShop = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such shop"})
    }

    const shop = await Shop.findById(id)

    if(!shop){
        return res.status(404).json({error: "No such shop"})
    }

    res.status(200).json(shop)
}

// create shop
const createShop = async (req, res) => {
    const { name, coords, products } = req.body
    const { buffer, mimetype } = req.file || {};

    try {
        const shop = await Shop.create({name, coords, products, buffer, mimetype})

        res.status(200).json(shop)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete shop
const deleteShop = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such shop"})
    }

    const shop = await Shop.findOneAndDelete({_id: id})

    if(!shop){
        return res.status(404).json({error: "No such shop"})
    }

    res.status(200).json(shop)
}

module.exports = { getShops, getShop, createShop, deleteShop }