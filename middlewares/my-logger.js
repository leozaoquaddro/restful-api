// Custom Logger
const myLogger = function (req, res, next) {
  console.log(`${req.currentTime} ==> ${req.method} ${req.url}`)
  next()
}

module.exports = myLogger
