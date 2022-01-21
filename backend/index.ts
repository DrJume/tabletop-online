import { createServer } from 'http'
const httpServer = createServer()

// *** init websockets ***

// init sharedb socket
import ShareDB from 'sharedb'
import WebSocket from 'ws'
import WebSocketJSONStream from '@teamwork/websocket-json-stream'

const shareDBSocketServer = new WebSocket.Server({ noServer: true })
const backend = new ShareDB()

// init socket.io socket
import { Server as SocketIOServer } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from './types/socketIo'
import { instrument } from '@socket.io/admin-ui'

const socketIOSocketServer = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
  httpServer,
  {
    path: '/socket.io',
    cors: {
      origin: ['http://localhost:3000', 'https://admin.socket.io'],
      credentials: true,
    },
  }
)

// *** additional config ***

// init admin panel, access only with /admin
instrument(socketIOSocketServer, {
  auth: false,
})

httpServer.on('upgrade', function upgrade(request, socket, head) {
  // socketIOSocketServer upgrades are handled by express
  if (!request.url.startsWith('/socket.io')) {
    shareDBSocketServer.handleUpgrade(request, socket, head, function done(ws) {
      shareDBSocketServer.emit('connection', ws, request)
    })
  }
})

// *** sharedb server logic ***
const connection = backend.connect()
const doc = connection.get('tabletop-online', 'room-1')

// create initial sharedb doc
if (!doc.type) {
  doc.create(
    {
      _meta: {
        userCounter: 1,
        idCounter: 1,
      },
      objects: {},
      players: {},
    },
    (error) => {
      console.log('doc created')
      if (error) console.error(error)
    }
  )
}

shareDBSocketServer.on('connection', (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket)
  backend.listen(stream)
})

// *** tabletop server logic ***

socketIOSocketServer.of('/tabletop').on('connection', (socket) => {
  console.log('user ' + socket.id + ' connected')

  socket.on('disconnect', () => {
    console.log('user ' + socket.id + ' disconnected')
  })
})

// start server
httpServer.listen(8080, () => {
  console.log('listening on *:8080')
})

// TODO: check if this is actually working
// force clean reconnect of all active sockets when using nodemon
process.once('SIGUSR2', () => {
  socketIOSocketServer.disconnectSockets(true)
  process.kill(process.pid, 'SIGUSR2')
})
