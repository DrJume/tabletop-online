import { reactive, toRef } from 'vue'

import { Connection, Op } from 'sharedb/lib/client'
import type { Doc, Socket } from 'sharedb/lib/sharedb'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { log } from '@/util/logger'
import { GameObjectsState, GameObjectType, useGameObjectsStore } from '@/stores/gameObjects'

import TsToolbelt from 'ts-toolbelt'

import { get, setWith } from 'lodash-es'

//

const ShareDB = reactive<{ userId: string; roomDoc: null | Doc }>({
  userId: '0',
  roomDoc: null,
})

// type GameObjectsStatePathUnion = List.Compulsory<Union.Merge<Object.Paths<GameObjectsState>>>
type GameObjectsStatePaths = TsToolbelt.List.Compulsory<TsToolbelt.Object.Paths<GameObjectsState>>

// type GameObjectsStatePaths = List.Take<
//   GameObjectsStatePathUnion,
//   List.Length<GameObjectsStatePathUnion>
// >

export const connectShareDB = () => {
  const socket = new ReconnectingWebSocket(`ws://${location.hostname}:8080`)
  const connection = new Connection(socket as Socket)
  const roomDoc: Doc<GameObjectsState> = connection.get('tabletop-online', 'room-1')
  ShareDB.roomDoc = roomDoc

  log.log('useShareDB roomDoc:', roomDoc)

  const gameObjects = useGameObjectsStore()

  // subscribe to ShareDB document
  roomDoc.subscribe((error) => {
    if (error) {
      log.error(error)
      return
    }

    // clone ShareDB doc with JSON trick to remove weird references
    const clonedShareDBDoc = JSON.parse(JSON.stringify(roomDoc.data))
    // apply ShareDB doc to local store
    gameObjects.$patch(clonedShareDBDoc)

    ShareDB.userId = String(roomDoc.data._meta.userCounter)
    roomDoc.submitOp({ p: ['_meta', 'userCounter'], na: 1 })

    log.log('ShareDB subscribe() data:', JSON.stringify(roomDoc.data))

    /* A change (operation) occured in the database.
     Combine all operations into one with 'op batch'.
     Sync ShareDB with the gameObjects store. */
    roomDoc.on('op batch', (ops: Op[], source) => {
      log.log("ShareDB on('op batch')", source, ops)

      /* The 'source' parameter is truthy, when
      the change initiated from this client.
      Block sync of local data which was
      already updated to prevent a sync loop. */
      if (source) return

      for (const op of ops) {
        const opPath = [...op.p] as GameObjectsStatePaths

        // const opTarget = opPath.pop()
        // if (!opTarget) return

        const path = opPath.join('.') as TsToolbelt.String.Join<typeof opPath, '.'>

        // // only evaluate game objects
        // if (opPath[0] !== 'objects') return
        // opPath.shift() // remove first item of path: 'objects'

        // const objectId = opPath.shift()
        // if (!objectId) return

        // // expect to update 'data' property
        // if (opPath.shift() !== 'data') return
        // const gameObjectData = gameObjects.objects[objectId].data
        // const lastPathPart = opPath.pop()
        // if (!lastPathPart) return // expect array to be not empty, so that a last path part exists

        // // eslint-disable-next-line unicorn/no-array-reduce
        // const patch = opPath.reduce(
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-ignore
        //   (pathData, pathPart) => pathData?.[pathPart],
        //   { objects: { [objectId]: { data: {} } } }
        // )
        // if (objectDataAtPathParent === undefined) return

        // if (!(lastPathPart in objectDataAtPathParent)) return // return if object doesn't contain the property

        // const objectDataAtPathRef = toRef(
        //   objectDataAtPathParent,
        //   lastPathPart as keyof typeof objectDataAtPathParent
        // )

        // differentiate operation types
        if ('oi' in op) {
          // 'oi': insert/overwrite property

          log.log("ShareDB operation 'oi'", op.p, JSON.stringify(op.oi), {
            userID: ShareDB.userId,
          })

          const patch: TsToolbelt.Object.Partial<GameObjectsState, 'deep'> = setWith(
            {},
            path,
            op.oi,
            Object
          )

          gameObjects.$patch(patch)
        } else if ('na' in op) {
          // 'na': add x to a number

          log.log("ShareDB operation 'na'", op)

          const patch: TsToolbelt.Object.Partial<GameObjectsState, 'deep'> = setWith(
            {},
            path,
            get(roomDoc.data, path),
            Object
          )

          gameObjects.$patch(patch)
        } else if ('li' in op) {
          //TODO: implement ShareDB 'li' operation
          log.warn("ShareDB operation 'li' not yet implemented!")
        }
      }
    })
  })

  roomDoc.on('load', () => {
    log.log("ShareDB on('load')", JSON.stringify(roomDoc.data))
  })
}

export const useShareDB = () => {
  if (!ShareDB.roomDoc)
    throw new Error('roomDoc is not set: call connect() before using useShareDB()')

  return {
    ShareDB: ShareDB as Readonly<{ userId: string; roomDoc: Doc }>,
  }
}
