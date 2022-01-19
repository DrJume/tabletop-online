export interface ServerToClientEvents {
  // noArg: () => void
  // basicEmit: (a: number, b: string, c: Buffer) => void
  // withAck: (d: string, callback: (e: number) => void) => void
  lockFromServer: (lock: boolean) => void
  move: (x: number, y: number) => void
}

export interface ClientToServerEvents {
  lockFromClient: (lock: boolean) => void
  drag: (x: number, y: number) => void
}
