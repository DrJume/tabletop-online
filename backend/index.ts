/* eslint-env node */

// import { createServer } from 'http'
// const httpServer = createServer()

import Fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import path from 'path'

// const serverFactory = (handler, opts) => {
//   httpServer.on('request', (req, res) => {
//     handler(req, res)
//   })

//   return httpServer
// }

const fastify = Fastify({
  /* serverFactory, */
  // logger: {
  //   prettyPrint: {
  //     translateTime: 'HH:MM:ss Z',
  //     ignore: 'pid,hostname',
  //   },
  // },
})

fastify.register(fastifyStatic, {
  // eslint-disable-next-line unicorn/prefer-module
  root: path.join(__dirname, '../dist'),
})

// init ShareDB socket
import ShareDB from 'sharedb'
import WebSocket from 'ws'
import WebSocketJSONStream from '@teamwork/websocket-json-stream'

const shareDBSocketServer = new WebSocket.Server({ noServer: true })
const backend = new ShareDB()

// init socket.io socket
import { Server as SocketIOServer } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from './types/socketIo'
import { instrument } from '@socket.io/admin-ui'
import { Doc } from 'sharedb/lib/client'

const socketIOSocketServer = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
  fastify.server,
  {
    path: '/socket.io',
    cors: {
      origin: ['http://localhost:3000', 'https://admin.socket.io'],
      credentials: true,
    },
  }
)

import { TabletopState } from '../src/stores/tabletop'
import { defineGameObject, GameObjectType } from '../src/types/gameObject'

// Socket.io admin panel, access only with /admin
instrument(socketIOSocketServer, {
  auth: false,
})

fastify.server.on('upgrade', (request, socket, head) => {
  if (!request.url.startsWith('/socket.io')) {
    shareDBSocketServer.handleUpgrade(request, socket, head, function done(ws) {
      shareDBSocketServer.emit('connection', ws, request)
    })
  }
})

import { playerName } from '../src/util/tabletopLogFormatter'

// ShareDB server logic
const connection = backend.connect()
const roomDoc: Doc<TabletopState> = connection.get('tabletop-online', 'room-1')

// create initial ShareDB doc
if (!roomDoc.type) {
  roomDoc.create(
    {
      _meta: {
        userCounter: 1,
        idCounter: 2,
        boardURL: '',
      },
      objects: {
        '1': defineGameObject({
          type: GameObjectType.PlayingCard,
          data: {
            _meta: { draggedBy: '', isVisible: true },
            position: {
              x: 10,
              y: 10,
              z: 10,
            },
            isLocked: false,
            isFlipped: false,
            // color: '',
          },
        }),
      },
      players: {},
      log: [],
    } as TabletopState,
    (error) => {
      console.log('doc created')
      if (error) console.error(error)
    }
  )
}

// subscribe to ShareDB doc to receive updates
roomDoc.subscribe()

shareDBSocketServer.on('connection', (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket)

  // Prevents server crashes on errors?
  stream.on('error', (error) => {
    console.log(error.message) // Tends to print "WebSocket CLOSING or CLOSED."
  })

  backend.listen(stream)
})

// tabletop Socket.io server logic
socketIOSocketServer.of('/tabletop').on('connection', (socket) => {
  console.log('user ' + socket.id + ' connected')

  socket.on('startDrag', ({ playerId, objectId }, accept) => {
    const objectDraggedBy = roomDoc.data.objects[objectId].data._meta.draggedBy

    if (!(objectDraggedBy === '' || objectDraggedBy === playerId)) {
      console.log(`BLOCK 'startDrag' of object '${objectId}' for player '${playerId}'`)
      accept(false)
      return
    }

    // lock game object for other players
    roomDoc.submitOp({
      p: ['objects', objectId, 'data', '_meta', 'draggedBy'],
      oi: playerId,
    })

    // send a move event to faster broadcast the draggedBy state than ShareDB
    socket.volatile.broadcast.emit('move', {
      playerId,
      objectId,
      position: roomDoc.data.objects[objectId].data.position,
    })

    accept(true)
  })

  socket.on('drag', ({ playerId, objectId, position }) => {
    const objectDraggedBy = roomDoc.data.objects[objectId].data._meta.draggedBy

    if (objectDraggedBy !== playerId) {
      console.log(`BLOCK 'drag' of object '${objectId}' from player '${playerId}'`)
      return
    }

    socket.volatile.broadcast.emit('move', { playerId, objectId, position })
  })

  socket.on('disconnect', () => {
    console.log('user ' + socket.id + ' disconnected', roomDoc.data.players[socket.id])

    if (!roomDoc.data.players[socket.id]) return

    const clonedPlayer = JSON.parse(JSON.stringify(roomDoc.data.players[socket.id]))

    roomDoc.submitOp([
      {
        p: ['players', socket.id],
        od: roomDoc.data.players[socket.id],
      },
      {
        p: ['log', String(roomDoc.data.log.length)],
        li: {
          timestamp: Date.now(),
          message: `${playerName({
            name: clonedPlayer.name,
            color: clonedPlayer.color,
          })} hat das Spiel verlassen.`,
          icon: 'UserRemoveIcon',
        },
      },
    ])
  })
})

fastify.listen(8080, '0.0.0.0', () => {
  console.log('listening on *:8080')
})

// force clean reconnect of all active sockets when using nodemon
process.once('SIGUSR2', () => {
  socketIOSocketServer.disconnectSockets(true)
  backend.close()
  process.kill(process.pid, 'SIGUSR2')
})
