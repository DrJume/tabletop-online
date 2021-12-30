import { defineStore } from 'pinia'

interface GameObjectsState {
  _meta: {
    idCounter: number
  }
  objects: Record<string, GameObject>
}

// big thanks to TypeScript for providing pattern matching

type GameObjectInit =
  | GameObjectBase<GameObjectType.PlayingCard, GameObjectDataTypes[GameObjectType.PlayingCard]>
  | GameObjectBase<GameObjectType, GameObjectData>

export type GameObjectDataTypes = {
  [GameObjectType.PlayingCard]: GameObjectDataPlayingCard
}

type GameObject = GameObjectInit & {
  meta: {
    isDragged: boolean
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
//   meta: {
//     isDragged: false,
//     isVisible: true,
//   },
//   data: {
//     x: 0,
//     y: 0,
//     isLocked: false,
//     isFlipped: false,
//   },
// }

export const useGameObjectsStore = defineStore('gameObjects', {
  state: (): GameObjectsState => ({
    _meta: {
      idCounter: 1,
    },
    objects: {},
  }),
  // getters: {},
  actions: {
    addGameObject({ type, data }: GameObjectInit) {
      this.objects[this._meta.idCounter++] = {
        type,
        meta: {
          isDragged: false,
          isVisible: true,
        },
        data,
      }
    },
    deleteGameObject({ id }: { id: number }) {
      delete this.objects[id]
    },
  },
})
