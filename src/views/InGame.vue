<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

import { useTabletopSocket } from '@/modules/useTabletopSocket'

const { onLock, doLock, drag, onMove } = useTabletopSocket('http://localhost:8080')

let locked = false

onLock((lockValue: boolean) => {
  locked = lockValue
})

// draggable card
const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  // TODO: make coordinates procentual and relative to screen size
  initialValue: { x: 40, y: 40 },

  // Callback when the dragging starts. Return `false` to prevent dragging.
  onStart() {
    if (locked) {
      return false
    } else {
      doLock(true)
    }
  },

  // Callback during dragging.
  onMove() {
    // TODO: throttle down the amount of messages sent
    drag(x.value, y.value)
  },

  // Callback when dragging end.
  onEnd() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    doLock(false)
    console.log('end')
  },
})

onMove((position: any) => {
  console.log(position)
  x.value = Number.parseInt(position.x)
  y.value = Number.parseInt(position.y)
})
</script>

<template>
  <div
    ref="el"
    :style="style"
    class="fixed py-56 px-8 w-80 text-xl text-center bg-red-400 cursor-pointer select-none"
  >
    Drag me! I am at {{ x }}, {{ y }}
  </div>
</template>
