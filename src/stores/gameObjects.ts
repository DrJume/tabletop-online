import { defineStore } from 'pinia'

interface GameObjectsState {
  _meta: {
    userCounter: number
    idCounter: number
  }
  objects: Record<string, GameObject>
}

// big thanks to TypeScript for providing pattern matching

type GameObjectInit =
  | GameObjectBase<GameObjectType.PlayingCard, GameObjectInitDataTypes[GameObjectType.PlayingCard]>
  | GameObjectBase<GameObjectType, GameObjectData>

type GameObjectInitDataTypes = {
  [GameObjectType.PlayingCard]: GameObjectDataPlayingCard
}

export type GameObjectDataTypes = {
  [K in keyof GameObjectInitDataTypes]: GameObjectInitDataTypes[K] & GameObjectMeta
}

type GameObject = GameObjectInit & {
  data: GameObjectMeta
}

type GameObjectMeta = {
  _meta: {
    id: string

    draggedBy: string
    isVisible: boolean
  }
}

export enum GameObjectType {
  PlayingCard = 'PlayingCard',
  PlayingObject = 'PlayingObject',
  PlayingBoard = 'PlayingBoard',
  Dice = 'Dice',
}

// type GameObjectTypeKey = `${GameObjectType}`
// type GameObjectTypeKeys2 = keyof typeof GameObjectType

interface GameObjectBase<Type, Data> {
  type: Type
  data: Data
}

interface GameObjectData {
  x: number
  y: number
  isLocked: boolean
}

interface GameObjectDataPlayingCard extends GameObjectData {
  isFlipped: boolean
}

// const test: GameObject = {
//   type: GameObjectType.PlayingCard,
//   data: {
//     _meta: {
//       id: '0',
//       isDragged: false,
//       isVisible: true,
//     },
//     x: 0,
//     y: 0,
//     isLocked: false,
//     isFlipped: false,
//   },
// }

export const useGameObjectsStore = defineStore('gameObjects', {
  state: (): GameObjectsState => ({
    _meta: {
      userCounter: 1,
      idCounter: 1,
    },
    objects: {},
  }),
  // getters: {},
  actions: {
    addGameObject({ type, data: initData }: GameObjectInit) {
      const id = this._meta.idCounter++
      this.objects[id] = {
        type,
        data: {
          _meta: {
            id: `${id}`,
            draggedBy: '',
            isVisible: true,
          },
          ...initData,
        },
      }
    },
    deleteGameObject({ id }: { id: number }) {
      delete this.objects[id]
    },
  },
})
