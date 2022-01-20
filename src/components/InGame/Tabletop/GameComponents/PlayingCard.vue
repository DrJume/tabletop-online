<script setup lang="ts">
import { computed, ref, UnwrapRef, watch } from 'vue'
import { useDraggable, useElementBounding, useVModel, useThrottleFn } from '@vueuse/core'

import { log } from '@/util/logger'

import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'

import { GameObjectDataTypes, GameObjectType } from '@/types/gameObject'
import { useShareDB } from '@/modules/useShareDB'

const sessionStore = useSessionStore()

const { ShareDBDoc } = useShareDB()

const props = defineProps<{
  tabletopRef: HTMLElement | null
  modelValue: GameObjectDataTypes[GameObjectType.PlayingCard]
  id: string
}>()
const gameObjectData = useVModel(
  props,
  'modelValue' /* , undefined, { deep: true, passive: true } */
)

// const gameObjects = useGameObjectsStore()

// const gameObjectData = computed(() => gameObjects.objects[props.id].data)

const cardRef = ref<HTMLElement | null>(null)
const playAreaBounds = useElementBounding(props.tabletopRef)

const broadcast = (position: UnwrapRef<typeof gameObjectData>) => {
  log.debug('BROADCAST()', { ...position })

  // TODO: sync live movement over socket.io
}
const broadcastThrottled = useThrottleFn(broadcast, 1000 / 30 /* 30 Hz */)

const { position: positionAbsoluteDraggable, isDragging } = useDraggable(cardRef, {
  draggingElement: props.tabletopRef,
  exact: true,
  // initialValue: { x: gameObjectData.value.position.x, y: gameObjectData.value.position.y },

  // runs when dragging starts. Return `false` to prevent dragging.
  onStart() {
    log.log('useDraggable onStart()')

    // block if object is already dragged by another user
    if (gameObjectData.value._meta.draggedBy !== '') return false

    // lock game object for other players
    ShareDBDoc.value.submitOp({
      p: ['objects', props.id, 'data', '_meta', 'draggedBy'],
      oi: `${sessionStore.userId}`,
    })
  },

  // runs during dragging.
  onMove(positionAbsolute) {
    // log.log('useDraggable onMove()', positionAbsolute)

    log.debug('useDraggable onMove() %cupdating positionRelative', 'color: red')

    if (!playAreaBounds) return

    // if the viewport is scrolled, get the offset for coordinates calculation
    const scrollOffset = {
      x: props.tabletopRef?.parentElement?.scrollLeft ?? 0,
      y: props.tabletopRef?.parentElement?.scrollTop ?? 0,
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

    broadcastThrottled(gameObjectData.value)
  },

  // runs when dragging ends. https://github.com/vueuse/vueuse/pull/1145
  onEnd(position, event) {
    if (!cardRef.value || !event.composedPath().includes(cardRef.value)) return

    log.log('useDraggable onEnd()', { ...gameObjectData.value, event })

    // sync final position over ShareDB
    ShareDBDoc.value.submitOp([
      {
        p: ['objects', props.id, 'data', 'position'],
        oi: {
          ...gameObjectData.value.position,
        },
      },
    ])

    // unlock game object for other players
    ShareDBDoc.value.submitOp({
      p: ['objects', props.id, 'data', '_meta', 'draggedBy'],
      oi: '',
    })
  },
})

const coordinateToRelative = (coordinate: number, scrollOffset: number, axisLength: number) =>
  Math.trunc(((coordinate + scrollOffset) / axisLength) * 1000) / 10

const relativeToCoordinate = (relative: number, scrollOffset: number, axisLength: number) =>
  (relative / 100) * axisLength - scrollOffset

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

    // TODO: interpolation for smooth move transition

    const scrollOffset = {
      x: props.tabletopRef?.parentElement?.scrollLeft ?? 0,
      y: props.tabletopRef?.parentElement?.scrollTop ?? 0,
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

const zIndex = computed(() => gameObjectData.value.position.z)
</script>

<template>
  <div
    ref="cardRef"
    :style="{ top: `${gameObjectData.position.y}%`, left: `${gameObjectData.position.x}%` }"
    class="flex absolute justify-center items-center w-[20%] h-[30%] text-center bg-green-400 cursor-pointer select-none tt-dynamic-font-size"
  >
    {{ gameObjectData.position.x }}% <br />
    {{ gameObjectData.position.y }}% <br />
    {{ gameObjectData.position.z }}
  </div>
</template>

<style scoped>
.tt-dynamic-z-index {
  z-index: v-bind(zIndex);
}
</style>
