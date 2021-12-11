import { useSocketIo } from '@/modules/useSocketIo'

import { AnonymousCallback } from '@/types/'
import { TabletopEvents } from '../../backend/types/tabletopEvents'

// let socketIoConnection: undefined | ReturnType<typeof useSocketIo>

export const useTabletopSocket = (backendUrl: string) => {
  // // only connect with socket.io on first use
  // if (socketIoConnection === undefined) socketIoConnection = useSocketIo(backendUrl, '/tabletop')

  const { reconnect, disconnect, onEvent } = useSocketIo(backendUrl, '/tabletop')

  const onHello = (callback: AnonymousCallback) => onEvent(TabletopEvents.HELLO, callback)

  return {
    reconnect,
    disconnect,
    onHello,
  }
}
