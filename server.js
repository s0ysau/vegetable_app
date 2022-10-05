// Require modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { veggies } = require('./models/vegetables') 

// Create the Express App
const app = express()


// Configure the app (app.set)

app.use(express.urlencoded({ extended: true}))
app.engine('jsx' , require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB Atlas')
})

// Mount middleware (app.use)


// Mount routes

// INDEX --- READ --- GET
app.get('/vegetables', (req, res) => {
    res.render('./vegetables/Index', { veggies })
})

// NEW (not applicable in an api)
// app.get('/vegetables/new', (req,res) => {

// })

// DELETE

// UPDATE

// CREATE 
// app.create('/vegetables', (req,res) => {

// })

// EDIT (not applicable in an api)

// SHOW --- READ --- GET
app.get('/vegetables/:i', (req,res) => {
    res.render('./vegetables/Show', {
        veggie: veggies[req.params.i]
    })
})

// Tell the app to listen on a port
app.listen(3001, () => {
    console.log('Listening on Port 3001')
})