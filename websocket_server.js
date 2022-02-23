const WebSocketServer = require('websocket').server
const http = require("http")

const server = http.createServer((req, res) => {
  //process HTTP req
})

server.listen(3333, () => {
  console.log("ws server opened on port 3333")
})

const wsServer = new WebSocketServer({
  httpServer: server,
  keepaliveInterval: 5000,
  keepalive: true,
  closeTimeout: 10000
})

wsServer.on('request', (req) => {
  let connection = req.accept(null, req.origin)
  console.log("client connected")

  connection.on('message', (message) => {
    connection.send(`reply from server: ${message.utf8Data}`)
    console.log(message)
  })

  connection.on('error', (error) => {
    console.log(`connection error: ${error}`)
  })

  connection.on('close', (reasonCode, description) => {
    console.log(`client disconnected: (${reasonCode}) ${description}`)
  })

  
})