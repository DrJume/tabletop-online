<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDraggable, useElementBounding } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const playAreaRef = ref<HTMLElement | null>(null)

const playArea = useElementBounding(playAreaRef)

const { x, y } = useDraggable(el, {
  draggingElement: playAreaRef,
  exact: true,
  initialValue: { x: 40, y: 40 },
})

// calculate the percentage for the position of objects
// useDraggable requires coordinates but the objects are arranged with percentages
const position = computed(() => {
  if (!playArea) return { x: 0, y: 0 }

  // if the viewport is scrolled, get the offset for coordinates calculation
  const xScrollOffset = playAreaRef.value?.parentElement?.scrollLeft || 0
  const yScrollOffset = playAreaRef.value?.parentElement?.scrollTop || 0

  return {
    x: Math.max(0, Math.floor(((x.value + xScrollOffset) / playArea.width.value) * 1000) / 10),
    y: Math.max(0, Math.floor(((y.value + yScrollOffset) / playArea.height.value) * 1000) / 10),
  }
})
</script>

<template>
  <div class="overflow-auto h-full bg-gray-200">
    <div ref="playAreaRef" class="flex relative items-start bg-red-400 aspect-square fill-viewport">
      <div
        ref="el"
        :style="`top: ${position.y}%; left: ${position.x}%`"
        class="absolute py-56 px-8 w-80 text-xl text-center bg-green-400 cursor-pointer select-none"
      >
        Drag me! I am at <br />{{ position.x }}%, <br />{{ position.y }}%
      </div>
    </div>
  </div>
</template>
