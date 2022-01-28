import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '@/../backend/types/socketIo'

import { useSessionStore } from '@/stores/session'

import { backendURL } from '@/util/globals'

export const useSocketIO = (namespace: `/${string}`) => {
  // socket.io reuses the existing instance based on same scheme/port/host, and we initialize sockets for each namespace.
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${backendURL}${namespace}`)

  const sessionStore = useSessionStore()

  socket.on('connect', () => {
    console.log("useSocketIO() on('connect') socket.id:", socket.id)
    sessionStore.user.id = socket.id
  })

  socket.on('disconnect', () => {
    console.log("useSocketIO() on('disconnect')")
  })

  // prevent clients from connecting multiple times during dev mode
  if (import.meta.hot) {
    // import.meta.hot.on('vite:beforeUpdate', () => {
    //   console.warn('vite:beforeUpdate')
    //   socket.disconnect()
    // })
    // import.meta.hot.on('vite:beforeFullReload', () => {
    //   console.warn('vite:beforeFullReload')
    // })
    // import.meta.hot.on('vite:beforePrune', () => {
    //   console.warn('vite:beforePrune')
    //   socket.disconnect()
    // })
    import.meta.hot.accept(() => {
      socket.connect()
    })
    import.meta.hot.dispose(() => {
      socket.disconnect()
    })
  }

  const reconnect = () => {
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }

  const onEvent = (
    eventName: keyof ServerToClientEvents,
    callback: (...args: Parameters<ServerToClientEvents[typeof eventName]>) => void
  ) => {
    socket.on(eventName, callback)
  }

  const emit = (
    eventName: keyof ClientToServerEvents,
    ...args: Parameters<ClientToServerEvents[typeof eventName]>
  ) => {
    socket.emit(eventName, ...args)
  }

  const volatileEmit = (
    eventName: keyof ClientToServerEvents,
    ...args: Parameters<ClientToServerEvents[typeof eventName]>
  ) => {
    socket.volatile.emit(eventName, ...args)
  }

  return {
    reconnect,
    disconnect,
    onEvent,
    emit,
    volatileEmit,
    socket,
  }
}
