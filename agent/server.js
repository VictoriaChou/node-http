const http = require('http')

let server = http.createServer((req, res) => {
  console.log(req.connection.remotePort)
  res.end('200')
}).listen(9990)

server.keepAliveTimeout = 5000