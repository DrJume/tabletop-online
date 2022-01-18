<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDraggable, useElementBounding, onKeyStroke, useCssVar } from '@vueuse/core'
import Sidebar from '@/components/InGame/Sidebar/index.vue'
import LogBar from '@/components/InGame/LogBar/index.vue'
import Dice from '@/components/InGame/Dice/index.vue'

const el = ref<HTMLElement | null>(null)
const playAreaRef = ref<HTMLElement | null>(null)

const playArea = useElementBounding(playAreaRef)

const { x, y } = useDraggable(el, {
  draggingElement: playAreaRef,
  exact: true,
  initialValue: { x: 40, y: 40 },
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

  return {
    x: Math.max(0, Math.floor(((x.value + xScrollOffset) / playArea.width.value) * 1000) / 10),
    y: Math.max(0, Math.floor(((y.value + yScrollOffset) / playArea.height.value) * 1000) / 10),
  }
})
</script>

<template>
  <Sidebar />
  <LogBar />
  <Dice />
  <div class="overflow-auto h-full bg-gray-200">
    <div
      ref="playAreaRef"
      class="flex relative items-start bg-red-400 aspect-square tt-fill-viewport"
    >
      <div
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
