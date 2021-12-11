import { createServer } from 'http'
import { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

import { ClientToServerEvents, ServerToClientEvents } from './types/socketIo'

const httpServer = createServer()

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    credentials: true,
  },
})

// init admin panel, access only with /admin
instrument(io, {
  auth: false,
})

// tabletop server logic
io.of('/tabletop').on('connection', (socket) => {
  console.log('user ' + socket.id + ' connected')

  socket.emit('hello', Date.now())

  socket.on('disconnect', () => {
    console.log('user ' + socket.id + ' disconnected')
  })
})

// start server
httpServer.listen(8080, () => {
  console.log('listening on *:8080')
})

// force clean reconnect of all active sockets when using nodemon
process.once('SIGUSR2', () => {
  io.disconnectSockets(true)
  process.kill(process.pid, 'SIGUSR2')
})
