<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import { useVModel } from '@vueuse/core'

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
</script>

<template>
  <!-- TODO: make loaded svg dynamic -->

  <div
    ref="elementRef"
    class="flex absolute w-[3%] h-[6%] cursor-pointer select-none"
    :style="{
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
        ${draggingColor && `--tw-drop-shadow : ${draggingColor}`}
      `"
    />
  </div>
</template>
