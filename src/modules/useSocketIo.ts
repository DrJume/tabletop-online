import { io, Socket } from 'socket.io-client'

import { AnonymousCallback } from '@/types/'
import { ClientToServerEvents, ServerToClientEvents } from '@/../backend/types/socketIo'

export const useSocketIo = (backendUrl: string, namespace: `/${string}`) => {
  // socket.io reuses the existing instance based on same scheme/port/host, and we initialize sockets for each namespace.
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${backendUrl}${namespace}`)

  // if (import.meta.hot) {
  //   import.meta.hot.dispose((data) => {
  //     socket.disconnect()
  //   })
  // }

  const reconnect = () => {
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }

  const onEvent = (eventName: keyof ServerToClientEvents, callback: AnonymousCallback) => {
    socket.on(eventName, callback)
  }

  const emit = (eventName: keyof ClientToServerEvents, value: any) => {
    socket.emit(eventName, value)
  }

  return {
    reconnect,
    disconnect,
    onEvent,
    emit,
  }
}
