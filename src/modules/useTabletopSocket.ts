import { useSocketIo } from '@/modules/useSocketIo'

import { AnonymousCallback } from '@/types/'

// let socketIoConnection: undefined | ReturnType<typeof useSocketIo>

export const useTabletopSocket = (backendUrl: string) => {
  // // only connect with socket.io on first use
  // if (socketIoConnection === undefined) socketIoConnection = useSocketIo(backendUrl, '/tabletop')

  const { reconnect, disconnect, onEvent, emit } = useSocketIo(backendUrl, '/tabletop')

  const onLock = (callback: AnonymousCallback) => onEvent('lockFromServer', callback)
  const onMove = (callback: AnonymousCallback) => onEvent('move', callback)

  const doLock = (lock: boolean) => emit('lockFromClient', lock)
  const drag = (x: number, y: number) => emit('drag', { x, y })

  return {
    reconnect,
    disconnect,
    onLock,
    drag,
    doLock,
    onMove,
  }
}
