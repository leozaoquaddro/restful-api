const http = require('http')
const index = require('./index.js')

const hostname = '127.0.0.1'
const port = 8080

const server = http.createServer(function(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(index)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
