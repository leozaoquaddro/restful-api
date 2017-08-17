const PORT = 3000
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const app = express()

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

// Customer Model (Interface)
const CostumerModel = mongoose.model('costumers', customerSchema)

// Middlewares
// Custom CurrentTime
const requestCurrentTime = function(req, res, next) {
  moment.locale('pt-br')
  req.currentTime = moment().format('lll')
  next()
}

// Custom Logger
const myLogger = function(req, res, next) {
  console.log(`${req.currentTime} ==> ${req.method} ${req.url}`)
  next()
}

// Register Middlewares
app.use(requestCurrentTime)
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
  console.log(req.body)
  res.status(201).send('POST')
})

// PUT /costumers/1
app.put('/costumers/:id', (req, res) => {
  console.log(req.params)
  res.sendStatus(204)
})

// DELETE /costumers/1
app.delete('/costumers/:id', (req, res) => {
  console.log(req.params)
  res.status(204).end()
})


app.listen(PORT, () => {
  // console.log('Servidor rodando na porta ' + PORT + '...')
  // ES6 Template String:
  console.log(`Servidor rodando na porta ${PORT}...`)
})
