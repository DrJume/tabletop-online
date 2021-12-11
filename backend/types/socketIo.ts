export interface ServerToClientEvents {
  // noArg: () => void
  // basicEmit: (a: number, b: string, c: Buffer) => void
  // withAck: (d: string, callback: (e: number) => void) => void
  hello: (timestamp: number) => void
  move: (x: number, y: number, userId: string) => void
}

export interface ClientToServerEvents {
  lock: (lock: boolean) => void
  drag: (x: number, y: number) => void
}
