const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// App Config
const fs = require('fs')
const env = require('node-env-file')
const envFile = __dirname + '/.env'
if (fs.existsSync(envFile)) env(envFile)
app.set('PORT', process.env.PORT)
app.set('MONGO_CONNECTION', process.env.MONGO_CONNECTION)

// Middlewares
const currentTime = require('./middlewares/current-time.js')
const myLogger = require('./middlewares/my-logger.js')

// Mongoose Connection
mongoose.connect(app.get('MONGO_CONNECTION'), { useMongoClient: true })

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

// Importing Routes
require('./routes/costumers')(app, CostumerModel)

// App Listen
app.listen(app.get('PORT'), () => {
  console.log(`Servidor rodando na porta ${app.get('PORT')}...`)
})
