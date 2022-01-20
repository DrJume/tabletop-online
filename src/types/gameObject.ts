export type GameObjectInit =
  | GameObjectBase<GameObjectType.PlayingCard, GameObjectInitDataTypes[GameObjectType.PlayingCard]>
  | GameObjectBase<GameObjectType, GameObjectData>

type GameObjectInitDataTypes = {
  [GameObjectType.PlayingCard]: GameObjectDataPlayingCard
}

export type GameObjectDataTypes = {
  [K in keyof GameObjectInitDataTypes]: GameObjectInitDataTypes[K] & GameObjectMeta
}

export type GameObject = GameObjectInit & {
  data: GameObjectMeta
}

type GameObjectMeta = {
  _meta: {
    // id: string

    draggedBy: string
    isVisible: boolean
  }
}
// big thanks to TypeScript for providing pattern matching

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
  position: {
    x: number
    y: number
    z: number
  }
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
