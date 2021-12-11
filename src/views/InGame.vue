<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

import { useTabletopSocket } from '@/modules/useTabletopSocket'

const { onHello } = useTabletopSocket('http://localhost:8080')

onHello((timestamp: number) => {
  console.log(timestamp)
})

// draggable card
const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
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
