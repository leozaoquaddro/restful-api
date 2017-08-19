module.exports = function(app, CostumerModel) {

  // GET /costumers
  app.get('/costumers', (req, res) => {
    CostumerModel.find({}, function (err, costumers) {
      if (err) res.sendStatus(404)
      res.status(200).send(costumers)
    })
  })

  // GET /costumers/1
  app.get('/costumers/:id', (req, res) => {
    // console.log(req.params)
    CostumerModel.findById(req.params.id, function (err, costumer) {
      if (err) res.sendStatus(404)
      res.status(200).send(costumer)
    })
  })

  // POST /costumers
  app.post('/costumers', (req, res) => {
    // console.log(req.body)
    CostumerModel.create(req.body, function (err, costumer) {
      if (err) res.sendStatus(412)
      res.status(201).send(costumer)
    })
  })

  // PUT /costumers/1
  app.put('/costumers/:id', (req, res) => {
    // console.log(req.params)
    CostumerModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if (err) res.sendStatus(404)
      res.sendStatus(204)
    })
  })
  
  // DELETE /costumers/1
  app.delete('/costumers/:id', (req, res) => {
    // console.log(req.params)
    CostumerModel.findByIdAndRemove(req.params.id, function (err) {
      if (err) res.sendStatus(404)
      res.sendStatus(204)
    })
  })
}
