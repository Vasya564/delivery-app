require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const shopsRoutes = require('./routes/shop')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/shops', shopsRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listening for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })