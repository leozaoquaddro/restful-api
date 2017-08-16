const PORT = 3000
const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const app = express()

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

app.use(requestCurrentTime)
app.use(myLogger)
app.use(bodyParser.json())

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
  console.log(req.query)
  const costumers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@doe.com"
    },
    {
      id: 2,
      name: "Mary Doe",
      email: "mary@doe.com"
    },
    {
      id: 3,
      name: "Susan Doe",
      email: "susan@doe.com"
    }
  ]
  res.send(costumers)
})

// GET /costumers/1
app.get('/costumers/:id', (req, res) => {
  console.log(req.params)
  res.send(req.params.id)
})

// POST /costumers
app.post('/costumers', (req, res) => {
  console.log(req.body)
  res.send('POST')
})

// PUT /costumers/1
app.put('/costumers/:id', (req, res) => {
  console.log(req.params)
  res.send(req.params.id)
})

// DELETE /costumers/1
app.delete('/costumers/:id', (req, res) => {
  console.log(req.params)
  res.send(req.params.id)
})


app.listen(PORT, () => {
  // console.log('Servidor rodando na porta ' + PORT + '...')
  // ES6 Template String:
  console.log(`Servidor rodando na porta ${PORT}...`)
})
