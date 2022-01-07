import { Connection } from 'sharedb/lib/client'
import type { Socket } from 'sharedb/lib/sharedb'
import ReconnectingWebSocket from 'reconnecting-websocket'

const socket = new ReconnectingWebSocket('ws://localhost:8080')
const connection = new Connection(socket as Socket)
const doc = connection.get('doc-collection', 'doc-id')
console.log(doc)

export const useShareDB = () => {
  return {
    doc,
  }
}
