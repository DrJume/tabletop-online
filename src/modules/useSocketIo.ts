import { io, Socket } from 'socket.io-client'

import { AnonymousCallback } from '@/types/'
import { ClientToServerEvents, ServerToClientEvents } from '@/../backend/types/socketIo'

export const useSocketIo = (backendUrl: string, namespace: `/${string}`) => {
  // socket.io reuses the existing instance based on same scheme/port/host, and we initialize sockets for each namespace.
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${backendUrl}${namespace}`)

  const reconnect = () => {
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }

  const onEvent = (eventName: keyof ServerToClientEvents, callback: AnonymousCallback) => {
    socket.on(eventName, callback)
  }

  return {
    reconnect,
    disconnect,
    onEvent,
  }
}
