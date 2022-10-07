// Require modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Veggies = require('./models/vegetables')

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

app.use(methodOverride('_method'))

// Mount routes

// INDEX --- READ --- GET
app.get('/vegetables', (req, res) => {
    Veggies.find({}, (err, foundVeggies) => {
        if (err){
            console.error(err)
            res.status(400).send(err)
        } else {
            res.render('vegetables/Index', {
                veggies: foundVeggies
            })
        }
    })
})

// NEW (not applicable in an api)
app.get('/vegetables/new', (req,res) => {
    res.render('vegetables/New')
})

// DELETE
app.delete('/vegetables/:id', (req, res) => {
    Veggies.findByIdAndDelete((req.params.id), (err,deletedVeggie) => {
        if (err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect('/vegetables')
        }
    })
})

// UPDATE
app.put('/vegetables/:id', (req, res) => {
    req.body.readyToEat === 'no' || req.body.readyToEat === true ? req.body.readyToEat = true : req.body.readyToEat = false
    Veggies.findByIdAndUpdate(req.params.id, req.body, {new:true},(err, updateVeggie) => {
        if (err) {
            console.error()
            res.status(400).send(err)
        } else {
            res.redirect(`/vegetables/${updateVeggie._id}`)
        }
    })
})

// CREATE 
app.post('/vegetables', (req,res) => {
    req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false
    Veggies.create(req.body, (err,createVeggie) => {
        if (err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect('/vegetables')
            // res.send(createVeggie)
        }
    })
})

// EDIT (not applicable in an api)
app.get('/vegetables/:id/edit', (req, res) => {
    Veggies.findById(req.params.id, (err, foundVeggies) => {
        if (err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.render('vegetables/Edit', {
                veggie: foundVeggies
            })
        }
    })
})

// SHOW --- READ --- GET
app.get('/vegetables/:id', (req,res) => {
    Veggies.findById(req.params.id, (err, foundVeggies) => {
        if (err) {
            console.error(err)
            res.send(400).send(err)
        } else {
            res.render('vegetables/Show', {
                veggie: foundVeggies
            })
        }
    })
})

// Tell the app to listen on a port
app.listen(3001, () => {
    console.log('Listening on Port 3001')
})