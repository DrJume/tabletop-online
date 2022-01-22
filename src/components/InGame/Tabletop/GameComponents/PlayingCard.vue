<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'

import { GameObjectDataTypes, GameObjectType } from '@/types/gameObject'
import { useTabletopDraggable } from '@/modules/useTabletopDraggable'

const props = defineProps<{
  tabletopRef: HTMLElement | null
  modelValue: GameObjectDataTypes<GameObjectType.PlayingCard>
  objectId: string
}>()
const gameObjectData = useVModel(props, 'modelValue')
const { tabletopRef } = toRefs(props)

const elementRef = ref<HTMLElement | null>(null)

useTabletopDraggable({
  elementRef,
  tabletopRef,
  objectId: props.objectId,
  gameObjectData,
})
</script>

<template>
  <div
    ref="elementRef"
    :style="{
      left: `${gameObjectData.position.x}%`,
      top: `${gameObjectData.position.y}%`,
      'z-index': Math.floor(gameObjectData.position.y * 1000),
    }"
    class="flex absolute justify-center items-center w-[10%] h-[15%] text-center bg-green-400 drop-shadow-md cursor-pointer select-none tt-dynamic-font-size"
  >
    {{ gameObjectData.position.x }}% <br />
    {{ gameObjectData.position.y }}% <br />
    {{ gameObjectData._meta.draggedBy }}
  </div>
</template>
