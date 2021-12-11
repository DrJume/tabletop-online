import { createServer } from 'http'
import { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

import { TabletopEvents } from './types/tabletopEvents'

const httpServer = createServer()

const io = new Server(httpServer, {
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

  socket.emit(TabletopEvents.HELLO, Date.now())

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
