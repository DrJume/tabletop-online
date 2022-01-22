export interface ServerToClientEvents {
  // noArg: () => void
  // basicEmit: (a: number, b: string, c: Buffer) => void
  // withAck: (d: string, callback: (e: number) => void) => void
  move: ({
    playerId,
    objectId,
    position,
  }: {
    playerId: string
    objectId: string
    position: { x: number; y: number; z: number }
  }) => void
}

export interface ClientToServerEvents {
  startDrag: (
    { playerId, objectId }: { playerId: string; objectId: string },
    accept: (ok: boolean) => void
  ) => void
  drag: ({
    playerId,
    objectId,
    position,
  }: {
    playerId: string
    objectId: string
    position: { x: number; y: number; z: number }
  }) => void
}
