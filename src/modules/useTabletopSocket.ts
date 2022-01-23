import { useSocketIO } from '@/modules/useSocketIO'

import { ClientToServerEvents, ServerToClientEvents } from '@/../backend/types/socketIo'

let socketIoConnection: undefined | ReturnType<typeof useSocketIO>

export const useTabletopSocket = () => {
  // only connect with socket.io on first use
  if (socketIoConnection === undefined) socketIoConnection = useSocketIO('/tabletop')

  const { reconnect, disconnect, onEvent, emit, volatileEmit } = socketIoConnection

  const generateListener =
    <K extends keyof ServerToClientEvents>(name: K) =>
    <E extends ServerToClientEvents[K]>(callback: E) =>
      onEvent(name, callback)

  const generateEmitter =
    (emitFn: typeof emit) =>
    <K extends keyof ClientToServerEvents>(name: K) =>
    (...params: Parameters<ClientToServerEvents[K]>) =>
      emitFn(name, ...params)

  const onMove = generateListener('move')

  const startDrag = generateEmitter(emit)('startDrag')
  const drag = generateEmitter(volatileEmit)('drag')

  return {
    reconnect,
    disconnect,

    startDrag,
    drag,

    onMove,
  }
}
