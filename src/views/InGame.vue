<script setup lang="ts">
import { computed, ComputedRef, onMounted, reactive, ref } from 'vue'
import { useDraggable } from '@vueuse/core'

import ReconnectingWebSocket from 'reconnecting-websocket'
import { Connection } from 'sharedb/lib/client'
import type { Socket } from 'sharedb/lib/sharedb'

// import { useTabletopSocket } from '@/modules/useTabletopSocket'

// const { onLock, doLock, drag, onMove } = useTabletopSocket('http://localhost:8080')

// let locked = false

// onLock((lockValue: boolean) => {
//   locked = lockValue
// })

const socket = new ReconnectingWebSocket('ws://localhost:8080')
const connection = new Connection(socket as Socket)

const doc = connection.get('doc-collection', 'doc-id')

doc.subscribe((error) => {
  if (error) return console.error(error)

  // If doc.type is undefined, the document has not been created, so let's create it
  if (!doc.type) {
    doc.create({ x: 0, y: 0 }, (error) => {
      if (error) console.error(error)
    })
  }
})

// draggable card
const el = ref<HTMLElement | null>(null)
let positionRelative: ComputedRef<{ x: number; y: number }>

onMounted(() => {
  if (el.value === null) throw new Error('could not get ref of draggable card')
  const container = el.value.parentElement
  if (container === null) throw new Error('could not get ref of draggable card container')

  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()

  doc.on('op', (op) => {
    positionClientAbsolute.value.x = (doc.data.x / 100) * containerWidth
    positionClientAbsolute.value.y = (doc.data.y / 100) * containerHeight
  })

  positionRelative = computed(() => {
    return {
      x: (positionClientAbsolute.value.x / containerWidth) * 100,
      y: (positionClientAbsolute.value.y / containerHeight) * 100,
    }
  })
})
// `style` will be a helper computed for `left: ?px; top: ?px;`
const { position: positionClientAbsolute, style } = useDraggable(el, {
  exact: true,
  // TODO: make coordinates procentual and relative to screen size
  initialValue: { x: 40, y: 40 },

  // Callback when the dragging starts. Return `false` to prevent dragging.
  onStart() {
    // if (locked) {
    //   return false
    // } else {
    //   // doLock(true)
    // }
    console.log('start')
  },

  // Callback during dragging.
  onMove() {
    // TODO: throttle down the amount of messages sent

    doc.submitOp([
      { p: ['x'], oi: positionRelative.value.x },
      { p: ['y'], oi: positionRelative.value.y },
    ])
  },

  // Callback when dragging end.
  onEnd() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // doLock(false)
    // console.log('end')
  },
})

// onMove((position: any) => {
//   console.log(position)
//   x.value = Number.parseInt(position.x)
//   y.value = Number.parseInt(position.y)
// })
</script>

<template>
  <div
    ref="el"
    :style="style"
    class="fixed py-56 px-8 w-80 text-xl text-center bg-red-400 cursor-pointer select-none"
  >
    Drag me! I am at {{ positionRelative.y }}, {{ positionRelative.y }}
  </div>
</template>
