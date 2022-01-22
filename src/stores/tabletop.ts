import { defineStore } from 'pinia'
import { GameObject, GameObjectInitDataTypes, GameObjectType } from '../types/gameObject' // use ../ for tmp fix to allow importing in backend/
import { Player } from '@/types/player'
import { LogEntry } from '@/types/log'
import { useSessionStore } from '@/stores/session'
import { useShareDB } from '@/modules/useShareDB'

export interface TabletopState {
  _meta: {
    userCounter: number
    idCounter: number
    boardURL: string
  }
  objects: Record<string, GameObject>
  players: Record<string, Player>
  log: Array<LogEntry>
}

export const useTabletopStore = defineStore('tabletop', {
  state: (): TabletopState => ({
    _meta: {
      userCounter: 1,
      idCounter: 1,
      boardURL: '',
    },
    objects: {},
    players: {},
    log: [],
  }),
  // getters: {},
  actions: {
    addGameObject<T extends GameObjectType>({
      type,
      data: initData,
    }: {
      type: T
      data: GameObjectInitDataTypes<T>
    }) {
      const { ShareDBDoc } = useShareDB()

      const id = this._meta.idCounter++
      this.objects[id] = {
        type,
        data: {
          _meta: {
            draggedBy: '',
            isVisible: true,
          },
          ...initData,
        },
      }

      ShareDBDoc.value.submitOp({
        p: ['_meta', 'idCounter'],
        na: 1, //increment counter
      })

      ShareDBDoc.value.submitOp({
        p: ['objects', id],
        oi: this.objects[id],
      })
    },
    deleteGameObject({ id }: { id: number }) {
      const { ShareDBDoc } = useShareDB()

      const clonedGameObject = JSON.parse(JSON.stringify(this.objects[id]))

      ShareDBDoc.value.submitOp({
        p: ['objects', id],
        od: clonedGameObject,
      })

      delete this.objects[id]
    },
    playerUpdate({ name, color }: Player) {
      const { ShareDBDoc } = useShareDB()
      const sessionStore = useSessionStore()

      const id = sessionStore._userId
      if (id === undefined) throw new Error('userId is not yet loaded')
      this.players[id] = {
        name,
        color,
      }

      ShareDBDoc.value.submitOp({
        p: ['players', id],
        oi: this.players[id],
      })
    },
    setBoardURL(url: string) {
      const { ShareDBDoc } = useShareDB()

      this._meta.boardURL = url

      ShareDBDoc.value.submitOp({
        p: ['_meta', 'boardURL'],
        oi: url,
      })
    },
    printToLog(message: string, icon: string) {
      const { ShareDBDoc } = useShareDB()
      const timestamp = Date.now()

      this.log.push({ timestamp, message, icon })

      ShareDBDoc.value.submitOp({
        p: ['log', this.log.length],
        li: this.log[this.log.length - 1],
      })
    },
  },
})
