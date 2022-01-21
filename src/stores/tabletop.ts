import { defineStore } from 'pinia'
import { GameObject, GameObjectInit, GameObjectType } from '@/types/gameObject'
import { Player } from '@/types/player'
import { useSessionStore } from '@/stores/session'
import { useShareDB } from '@/modules/useShareDB'

export interface TabletopState {
  _meta: {
    userCounter: number
    idCounter: number
  }
  objects: Record<string, GameObject>
  players: Record<string, Player>
}

export const useTabletopStore = defineStore('tabletop', {
  state: (): TabletopState => ({
    _meta: {
      userCounter: 1,
      idCounter: 1,
    },
    objects: {},
    players: {},
  }),
  // getters: {},
  actions: {
    addGameObject({ type, data: initData }: GameObjectInit) {
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
    spawnObject({ figure, color }: { figure: any; color: string }) {
      this.addGameObject({
        type: GameObjectType.PlayingObject,
        data: {
          position: {
            x: 50,
            y: 50,
            z: 10,
          },
          //image: figure,
          color,
          isLocked: false,
        },
      })
    },
    deleteGameObject({ id }: { id: number }) {
      delete this.objects[id]
    },
    playerUpdate({ name, color }: Player) {
      const { ShareDBDoc } = useShareDB()
      const sessionStore = useSessionStore()

      const id = sessionStore.userId
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
  },
})
