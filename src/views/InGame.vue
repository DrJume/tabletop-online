<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDraggable, useElementBounding, onKeyStroke, useCssVar } from '@vueuse/core'

// sharedb socket
import ReconnectingWebSocket from 'reconnecting-websocket'
import { Connection } from 'sharedb/lib/client'
import type { Socket } from 'sharedb/lib/sharedb'

const socket = new ReconnectingWebSocket('ws://localhost:8080')
const connection = new Connection(socket as Socket)

const doc = connection.get('doc-collection', 'doc-id')

const isVisible = ref(false)

doc.subscribe((error) => {
  if (error) return console.error(error)

  console.log('subscribe', JSON.stringify(doc.data))

  // If doc.type is undefined, the document has not been created, so let's create it
  if (!doc.type) {
    doc.create({ idCounter: 0, objects: {} }, (error) => {
      console.log('doc created')
      if (error) console.error(error)

      // create new card and increment idCounter
      doc.submitOp([
        { p: ['objects', doc.data.idCounter], oi: { x: 0, y: 0, isLocked: false } },
        { p: ['idCounter'], na: 1 },
      ])
    })
  }

  if (doc.data.objects['0']) {
    updateCard()
    isVisible.value = true
  }

  // combine all operations into one with 'op batch'
  doc.on('op batch', (op) => {
    if (hasDragged.value) return
    if (!isVisible.value) isVisible.value = true

    console.log('op batch', op)
    updateCard()
  })
})

// draggable card
const el = ref<HTMLElement | null>(null)
const playAreaRef = ref<HTMLElement | null>(null)
const playArea = useElementBounding(playAreaRef)

const hasDragged = ref(false)

const { x, y } = useDraggable(el, {
  draggingElement: playAreaRef,
  exact: true,
  initialValue: { x: 0, y: 0 },

  // Callback when the dragging starts. Return `false` to prevent dragging.
  onStart() {
    if (doc.data.objects['0'].isLocked) {
      console.log('start drag blocked')

      return false
    }
    hasDragged.value = true
    doc.submitOp([{ p: ['objects', '0', 'isLocked'], oi: true }])

    console.log('start card drag')
  },

  // Callback during dragging.
  onMove() {
    // TODO: throttle down the amount of messages sent

    doc.submitOp([
      { p: ['objects', '0', 'x'], oi: position.value.x },
      { p: ['objects', '0', 'y'], oi: position.value.y },
    ])
  },

  // Callback when dragging end.
  onEnd() {
    if (!hasDragged.value) return

    console.log('end card drag')
    doc.submitOp([{ p: ['objects', '0', 'isLocked'], oi: false }])
    hasDragged.value = false
  },
})

const updateCard = () => {
  console.log('update card', JSON.stringify(doc.data))

  // if the viewport is scrolled, get the offset for coordinates calculation
  const xScrollOffset = playAreaRef.value?.parentElement?.scrollLeft || 0
  const yScrollOffset = playAreaRef.value?.parentElement?.scrollTop || 0

  x.value = (doc.data.objects['0'].x / 100) * playArea.width.value - xScrollOffset
  y.value = (doc.data.objects['0'].y / 100) * playArea.height.value - yScrollOffset
}

doc.on('load', () => {
  console.log('load', JSON.stringify(doc.data))
})

const zoomVar = useCssVar('--zoom', playAreaRef)
const zoomPercent = computed(() => {
  return Number.parseInt(zoomVar.value.replace('%', ''))
})

onKeyStroke('+', () => {
  zoomVar.value = `${zoomPercent.value + 10}%`
})
onKeyStroke('0', () => {
  zoomVar.value = '100%'
})
onKeyStroke('-', () => {
  // zooming out of playarea is not permitted
  if (zoomPercent.value <= 100) return

  zoomVar.value = `${zoomPercent.value - 10}%`
})

const dynamicFontSize = computed(() => `${(zoomPercent.value / 100) * 1.25}rem`)

// calculate the percentage for the position of objects
// useDraggable requires coordinates but the objects are arranged with percentages
const position = computed(() => {
  if (!playArea) return { x: 0, y: 0 }

  // if the viewport is scrolled, get the offset for coordinates calculation
  const xScrollOffset = playAreaRef.value?.parentElement?.scrollLeft || 0
  const yScrollOffset = playAreaRef.value?.parentElement?.scrollTop || 0

  console.log({ xScrollOffset, yScrollOffset })

  return {
    x: Math.max(0, Math.floor(((x.value + xScrollOffset) / playArea.width.value) * 1000) / 10),
    y: Math.max(0, Math.floor(((y.value + yScrollOffset) / playArea.height.value) * 1000) / 10),
  }
})
</script>

<template>
  <div class="overflow-auto h-full bg-gray-200">
    <div
      ref="playAreaRef"
      class="flex relative items-start bg-red-400 aspect-square tt-fill-viewport"
    >
      <div
        v-show="isVisible"
        ref="el"
        :style="`top: ${position.y}%; left: ${position.x}%`"
        class="flex absolute justify-center items-center text-center bg-green-400 cursor-pointer select-none w-[20%] h-[30%] tt-dynamic-font-size"
      >
        Drag me! I am at <br />{{ position.x }}%, <br />{{ position.y }}%
      </div>
    </div>
  </div>
</template>

<style>
.tt-dynamic-font-size {
  font-size: v-bind(dynamicFontSize);
}
</style>
