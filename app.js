const PORT = 3000
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const currentTime = require('./middlewares/current-time.js')
const myLogger = require('./middlewares/my-logger.js')

// Mongoose Connection
mongoose.connect('mongodb://localhost/local', { useMongoClient: true })

// Customer Schema
const customerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  birthDay: Date,
  weight: Number,
  height: Number,
  sex: String,
  rich: Boolean,
  createAt: { type: Date, default: Date.now } 
})

// Customer Model
const CostumerModel = mongoose.model('costumers', customerSchema)

// Register Middlewares
app.use(currentTime)
app.use(myLogger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
// GET /
app.get('/', (req, res) => {
  const apiInfo = {
    name: 'RESTful API',
    version: '1.0.0'
  } 

  res.send(apiInfo)
})

// ALL /costumers
// app.all('/costumers', function (req, res, next) {
//   console.log(`${req.method} /costumers`)
//   next()
// })

// GET /costumers
app.get('/costumers', (req, res) => {
  CostumerModel.find({}, function(err, costumers) {
    if (err) res.sendStatus(404)
    res.status(200).send(costumers)
  })
})

// GET /costumers/1
app.get('/costumers/:id', (req, res) => {
  // console.log(req.params)
  CostumerModel.findById(req.params.id, function(err, costumer) {
    if (err) res.sendStatus(404)
    res.status(200).send(costumer)
  })
})

// POST /costumers
app.post('/costumers', (req, res) => {
  // console.log(req.body)
  CostumerModel.create(req.body, function(err, costumer) {
    if (err) res.sendStatus(412)
    res.status(201).send(costumer)
  })
})

// PUT /costumers/1
app.put('/costumers/:id', (req, res) => {
  // console.log(req.params)
  CostumerModel.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })
})

// DELETE /costumers/1
app.delete('/costumers/:id', (req, res) => {
  // console.log(req.params)
  CostumerModel.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })
})


app.listen(PORT, () => {
  // console.log('Servidor rodando na porta ' + PORT + '...')
  // ES6 Template String:
  console.log(`Servidor rodando na porta ${PORT}...`)
})
