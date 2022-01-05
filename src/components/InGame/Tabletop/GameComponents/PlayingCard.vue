<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDraggable, useElementBounding, useVModel, biSyncRef, useThrottleFn } from '@vueuse/core'

import { log } from '@/util/logger'

import { GameObjectDataTypes, GameObjectType } from '@/stores/gameObjects'

const props = defineProps<{
  tabletopRef: HTMLElement | null
  modelValue: GameObjectDataTypes[GameObjectType.PlayingCard]
}>()
const gameObjectData = useVModel(props, 'modelValue')

// TODO: needs to be connected with store over bisyncref
// TODO: local changes of card
// -> 1. push to store
// -> 2. push to sharedb

// global changes come from store

const card = ref<HTMLElement | null>(null)
// const hasDragged = ref(false)
const playAreaBounds = useElementBounding(props.tabletopRef)

const { position: positionDragPx, isDragging } = useDraggable(card, {
  draggingElement: props.tabletopRef,
  exact: true,
  // initialValue: { x: gameObjectData.value.x, y: gameObjectData.value.y }, // not needed -> biSync does this

  // Callback when the dragging starts. Return `false` to prevent dragging.
  onStart() {
    // if (doc.data.objects['0'].isLocked) {
    //   log.log('start drag blocked')

    //   return false
    // }
    // hasDragged.value = true
    // doc.submitOp([{ p: ['objects', '0', 'isLocked'], oi: true }])

    log.log('start card drag')
  },

  // Callback during dragging.
  onMove() {
    // // TODO: throttle down the amount of messages sent
    // doc.submitOp([
    //   { p: ['objects', '0', 'x'], oi: position.value.x },
    //   { p: ['objects', '0', 'y'], oi: position.value.y },
    // ])
  },

  // Callback when dragging end.
  onEnd() {
    // if (!hasDragged.value) return
    log.log('end card drag')
    // doc.submitOp([{ p: ['objects', '0', 'isLocked'], oi: false }])
    // hasDragged.value = false
  },
})

const updateCard = () => {
  // log.log('update card', JSON.stringify(doc.data))
  // // if the viewport is scrolled, get the offset for coordinates calculation
  // const xScrollOffset = props.tabletopRef?.parentElement?.scrollLeft || 0
  // const yScrollOffset = props.tabletopRef?.parentElement?.scrollTop || 0
  // x.value = (doc.data.objects['0'].x / 100) * playAreaBounds.width.value - xScrollOffset
  // y.value = (doc.data.objects['0'].y / 100) * playAreaBounds.height.value - yScrollOffset
}

// const positionTruncated = computed(() => {})

// calculate the percentage for the position of objects
// useDraggable requires coordinates but the objects are arranged with percentages
const positionPercent = ref({
  x: 0,
  y: 0,
})

// converts useDraggable coordinates into percent, if card is dragged by user
watch(
  positionDragPx,
  (positionLocalPx) => {
    log.debug('watch(positionDragPx)', { ...positionLocalPx })
    if (!isDragging.value) return // mutex
    log.debug('watch(positionDragPx) %cupdating positionPercent', 'color: red')

    if (!playAreaBounds) return { x: 0, y: 0 }

    // if the viewport is scrolled, get the offset for coordinates calculation
    const xScrollOffset = props.tabletopRef?.parentElement?.scrollLeft || 0
    const yScrollOffset = props.tabletopRef?.parentElement?.scrollTop || 0

    // log.debug('watch(positionDragPx) scrollOffset:', { xScrollOffset, yScrollOffset })

    positionPercent.value.x = Math.max(
      0,
      Math.trunc(((positionLocalPx.x + xScrollOffset) / playAreaBounds.width.value) * 1000) / 10
    )

    positionPercent.value.y = Math.max(
      0,
      Math.trunc(((positionLocalPx.y + yScrollOffset) / playAreaBounds.height.value) * 1000) / 10
    )
  },
  { deep: true }
)

const broadcast = useThrottleFn((positionPercent) => {
  log.debug('BROADCAST()', { ...positionPercent })
  // TODO: sync with sharedb
}, 1000 / 30)

/* watch incoming position changes in percent
   position in percent is synced between local and store
   handle 2 different cases:
   - user drags the card -> changes are pushed to sharedb
   - user doesn't drag the card -> changes are updated locally */
watch(
  positionPercent,
  (positionLocalPercent) => {
    log.debug('watch(positionPercent)', { ...positionLocalPercent })
    if (isDragging.value) {
      // user drags the card -> changes are pushed to sharedb
      broadcast(positionLocalPercent)
      return
    }

    // user doesn't drag the card -> changes are updated locally

    log.debug('watch(positionPercent) %cupdating positionDragPx', 'color: blue')

    // TODO: interpolation for smooth move transition

    const xScrollOffset = props.tabletopRef?.parentElement?.scrollLeft || 0
    const yScrollOffset = props.tabletopRef?.parentElement?.scrollTop || 0

    positionDragPx.value.x =
      (positionLocalPercent.x / 100) * playAreaBounds.width.value - xScrollOffset
    positionDragPx.value.y =
      (positionLocalPercent.y / 100) * playAreaBounds.height.value - yScrollOffset
  },
  { deep: true }
)

biSyncRef(positionPercent, gameObjectData)
</script>

<template>
  <div
    ref="card"
    :style="{ top: `${positionPercent.y}%`, left: `${positionPercent.x}%` }"
    class="flex absolute justify-center items-center w-[20%] h-[30%] text-center bg-green-400 cursor-pointer select-none tt-dynamic-font-size"
  >
    Drag me! I am at <br />{{ positionPercent.x }}%, <br />{{ positionPercent.y }}%
  </div>
</template>
