import { Ref, UnwrapRef, watch } from 'vue'
import {
  unrefElement,
  useDraggable,
  useElementBounding,
  useThrottleFn,
  VueInstance,
} from '@vueuse/core'

import { GameObjectDataTypes, GameObjectType } from '@/types/gameObject'

import { log } from '@/util/logger'

import { useSessionStore } from '@/stores/session'

import { useShareDB } from '@/modules/useShareDB'
import { useTabletopSocket } from '@/modules/useTabletopSocket'

const coordinateToRelative = (coordinate: number, scrollOffset: number, axisLength: number) =>
  Math.trunc(((coordinate + scrollOffset) / axisLength) * 1000) / 10

const relativeToCoordinate = (relative: number, scrollOffset: number, axisLength: number) =>
  (relative / 100) * axisLength - scrollOffset

export const useTabletopDraggable = <T extends GameObjectDataTypes<GameObjectType>>({
  elementRef,
  tabletopRef,
  gameObjectData,
  objectId,
}: {
  elementRef: Ref<HTMLElement | null>
  tabletopRef: Ref<HTMLElement | null>
  gameObjectData: Ref<T>
  objectId: string
}) => {
  const sessionStore = useSessionStore()

  const { startDrag, drag, onMove } = useTabletopSocket()
  const { ShareDBDoc } = useShareDB()

  const playAreaBounds = useElementBounding(tabletopRef)

  const broadcast = ({
    playerId,
    objectId,
    data,
  }: {
    playerId: string
    objectId: string
    data: UnwrapRef<typeof gameObjectData>
  }) => {
    log.debug('BROADCAST()', { ...data.position })

    drag({ playerId, objectId, position: data.position })
  }
  const broadcastThrottled = useThrottleFn(broadcast, /* 30 Hz */ 1000 / 30, /* leading */ false)

  // (elementRef?.value as unknown as VueInstance)?.$el ?? elementRef,
  // unrefElement(elementRef),
  const { position: positionAbsoluteDraggable, isDragging } = useDraggable(elementRef, {
    draggingElement: tabletopRef,
    // exact: true,
    // initialValue: { x: gameObjectData.value.position.x, y: gameObjectData.value.position.y },

    // runs when dragging starts. Return `false` to prevent dragging
    onStart() {
      log.log('useDraggable onStart()')

      // block if object is already dragged by another user
      if (
        !(
          gameObjectData.value._meta.draggedBy === '' ||
          gameObjectData.value._meta.draggedBy === sessionStore.safeUserId
        )
      )
        return false

      // optimistic aquisition
      gameObjectData.value._meta.draggedBy = sessionStore.safeUserId

      startDrag({ playerId: sessionStore.safeUserId, objectId }, (ok) => {
        if (!ok) {
          console.error('BLOCK CARD')

          if (gameObjectData.value._meta.draggedBy === sessionStore.safeUserId)
            gameObjectData.value._meta.draggedBy = ''

          return
        }
      })
    },

    // runs during dragging
    onMove(positionAbsolute) {
      // log.log('useDraggable onMove()', positionAbsolute)

      log.debug('useDraggable onMove() %cupdating positionRelative', 'color: red')

      if (!playAreaBounds) return

      // if the viewport is scrolled, get the offset for coordinates calculation
      const scrollOffset = {
        x: tabletopRef.value?.parentElement?.scrollLeft ?? 0,
        y: tabletopRef.value?.parentElement?.scrollTop ?? 0,
      }

      // log.debug('useDraggable onMove() scrollOffset:', { xScrollOffset, yScrollOffset })

      gameObjectData.value.position = {
        x: Math.max(
          0,
          coordinateToRelative(positionAbsolute.x, scrollOffset.x, playAreaBounds.width.value)
        ),
        y: Math.max(
          0,
          coordinateToRelative(positionAbsolute.y, scrollOffset.y, playAreaBounds.height.value)
        ),
        z: 10,
      }

      broadcastThrottled({
        playerId: sessionStore.safeUserId,
        objectId,
        data: gameObjectData.value,
      })
    },

    // runs when dragging ends
    onEnd(position, event) {
      log.log('useDraggable onEnd()', { ...gameObjectData.value, event })

      gameObjectData.value._meta.draggedBy = ''

      // sync final position over ShareDB
      ShareDBDoc.value.submitOp([
        {
          p: ['objects', objectId, 'data', 'position'],
          oi: {
            ...gameObjectData.value.position,
          },
        },
        // unlock game object for other players
        {
          p: ['objects', objectId, 'data', '_meta', 'draggedBy'],
          oi: '',
        },
      ])
    },
  })

  onMove(({ playerId: movedByPlayerId, objectId: movedObjectId, position }) => {
    if (movedObjectId !== objectId) return

    gameObjectData.value.position = {
      x: position.x,
      y: position.y,
      z: position.z,
    }
    gameObjectData.value._meta.draggedBy = movedByPlayerId
  })

  /*
    Watch for changes on the gameObject, which is connected via v-model to the store.
    Convert the synced relative positions back to absolute positions for useDraggable.
  */
  watch(
    gameObjectData,
    (positionRelative) => {
      log.debug('watch(positionRelative)', { ...positionRelative })
      if (isDragging.value) return

      log.debug('watch(positionRelative) %cupdating positionDraggableAbsolute', 'color: blue')

      // TODO: interpolation for smoother move transition

      const scrollOffset = {
        x: tabletopRef.value?.parentElement?.scrollLeft ?? 0,
        y: tabletopRef.value?.parentElement?.scrollTop ?? 0,
      }

      positionAbsoluteDraggable.value.x = relativeToCoordinate(
        positionRelative.position.x,
        scrollOffset.x,
        playAreaBounds.width.value
      )
      positionAbsoluteDraggable.value.y = relativeToCoordinate(
        positionRelative.position.y,
        scrollOffset.y,
        playAreaBounds.height.value
      )
    },
    { deep: true }
  )
}
