<script setup lang="ts">
import { ref, toRefs, computed, onMounted } from 'vue'
import { unrefElement, useElementBounding, useVModel } from '@vueuse/core'

import { GameObjectDataTypes, GameObjectType } from '@/types/gameObject'
import { useTabletopDraggable } from '@/modules/useTabletopDraggable'

import FigureImg from '@/assets/figures/figure.svg?component'
import { useTabletopStore } from '@/stores/tabletop'

const props = defineProps<{
  tabletopRef: HTMLElement | null
  modelValue: GameObjectDataTypes<GameObjectType.PlayingObject>
  objectId: string
}>()
const gameObjectData = useVModel(props, 'modelValue')
const { tabletopRef } = toRefs(props)

const elementRef = ref<HTMLElement | null>(null)
const tabletopStore = useTabletopStore()

// const playAreaBounds = useElementBounding(tabletopRef)

useTabletopDraggable({
  elementRef,
  tabletopRef,
  objectId: props.objectId,
  gameObjectData,
})

const draggingColor = computed(() => {
  const playerColor = tabletopStore.players[gameObjectData.value._meta.draggedBy]?.color

  if (!playerColor) return

  return `drop-shadow(1px 1px 2px ${playerColor}) drop-shadow(-1px -1px 2px ${playerColor}) drop-shadow(1px -1px 2px ${playerColor}) drop-shadow(-1px 1px 2px ${playerColor})`
})

// const translateCSS = computed(
//   () =>
//     `translate3d(
//       ${(gameObjectData.value.position.x / 100) * playAreaBounds.width.value}px,
//       ${(gameObjectData.value.position.y / 100) * playAreaBounds.height.value}px,
//       ${Math.floor(gameObjectData.value.position.y * 1000)}
//     )`
// )

onMounted(() => {
  console.log(unrefElement(elementRef))
})
</script>

<template>
  <!-- TODO: make loaded svg dynamic -->

  <div
    ref="elementRef"
    class="flex absolute w-[3%] h-[6%] transform-gpu cursor-pointer select-none"
    :style="{
      // top: '0px',
      // left: '0px',
      // transform: translateCSS,
      left: `${gameObjectData.position.x}%`,
      top: `${gameObjectData.position.y}%`,
      'z-index': Math.floor(gameObjectData.position.y * 1000),
    }"
  >
    <component
      :is="FigureImg"
      class="flex w-full h-full drop-shadow-lg"
      :style="`
        color: ${gameObjectData.color};
        ${draggingColor && `--tw-drop-shadow : ${draggingColor}`};
      `"
    />
    <!-- <component
    :is="FigureImg"
    ref="elementRef"
    class="flex absolute w-[3%] h-[6%] drop-shadow-lg cursor-pointer select-none"
    :style="`
        color: ${gameObjectData.color};
        ${draggingColor && `--tw-drop-shadow : ${draggingColor}`};
        left: ${gameObjectData.position.x}%;
        top: ${gameObjectData.position.y}%;
        z-index: ${Math.floor(gameObjectData.position.y * 1000)};
      `"
  /> -->
  </div>
</template>
