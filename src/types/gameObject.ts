// export type GameObjectInit =
//   | GameObjectBase<GameObjectType.PlayingCard>
//   | GameObjectBase<GameObjectType.PlayingObject>
// | GameObjectBase<GameObjectType>

// export type GameObjectInitDataTypes = {
//   [GameObjectType.PlayingCard]: GameObjectDataPlayingCard
//   [GameObjectType.PlayingObject]: GameObjectDataPlayingObject
// }

// type a = Parameters<(num: number) => void>

export type GameObjectInitDataTypes<T extends GameObjectType> = T extends GameObjectType.PlayingCard
  ? GameObjectDataPlayingCard
  : T extends GameObjectType.PlayingObject
  ? GameObjectDataPlayingObject
  : never

export type GameObjectDataTypes<T extends GameObjectType> = GameObjectInitDataTypes<T> &
  GameObjectMeta

export const defineGameObject = <T extends GameObjectType>(gameObject: {
  type: T
  data: GameObjectDataTypes<T>
}) => gameObject

export type GameObject = ReturnType<typeof defineGameObject>

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
  // PlayingBoard = 'PlayingBoard',
  // Dice = 'Dice',
}

// type GameObjectTypeKey = `${GameObjectType}`
// type GameObjectTypeKeys2 = keyof typeof GameObjectType

// interface GameObjectBase<T extends GameObjectType> {
//   type: T
//   data: GameObjectInitDataTypes<T>
// }

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

interface GameObjectDataPlayingObject extends GameObjectData {
  color: string
  // image: string
}

// const test: GameObject = defineGameObject({
//   type: GameObjectType.PlayingCard,
//   data: {
//     _meta: {
//       draggedBy: '',
//       isVisible: true,
//     },
//     position: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//     isLocked: false,
//     isFlipped: false,
//     color: 'asd',
//   },
// })
