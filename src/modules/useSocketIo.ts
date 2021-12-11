import { io } from 'socket.io-client'

import { AnonymousCallback } from '@/types/'

export const useSocketIo = (backendUrl: string, namespace: `/${string}`) => {
  // socket.io reuses the existing instance based on same scheme/port/host, and we initialize sockets for each namespace.
  const socket = io(`${backendUrl}${namespace}`)

  const reconnect = () => {
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }

  const onEvent = (eventName: string, callback: AnonymousCallback) => {
    socket.on(eventName, callback)
  }

  return {
    reconnect,
    disconnect,
    onEvent,
  }
}
