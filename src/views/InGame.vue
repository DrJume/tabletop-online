<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

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
    if (!isVisible.value) isVisible.value = true

    console.log('op batch', op)
    updateCard()
  })
})

// draggable card
const el = ref<HTMLElement | null>(null)

const hasDragged = ref(false)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
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
      { p: ['objects', '0', 'x'], oi: x.value },
      { p: ['objects', '0', 'y'], oi: y.value },
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
  x.value = doc.data.objects['0'].x
  y.value = doc.data.objects['0'].y
}

doc.on('load', () => {
  console.log('load', JSON.stringify(doc.data))
})
</script>

<template>
  <div
    v-show="isVisible"
    ref="el"
    :style="style"
    class="fixed py-56 px-8 w-80 text-xl text-center bg-red-400 cursor-pointer select-none"
  >
    Drag me! I am at {{ x }}, {{ y }}
  </div>
</template>
