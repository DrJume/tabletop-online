<script lang="ts">
import PlayingCard from '@/components/InGame/Tabletop/GameComponents/PlayingCard.vue'
import PlayingBoard from '@/components/InGame/Tabletop/GameComponents/PlayingBoard.vue'
import PlayingObject from '@/components/InGame/Tabletop/GameComponents/PlayingObject.vue'

export default {
  components: {
    PlayingCard,
    PlayingBoard,
    PlayingObject,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onKeyStroke, useCssVar } from '@vueuse/core'
import Sidebar from '@/components/InGame/Sidebar/index.vue'
import LogBar from '@/components/InGame/LogBar/index.vue'
import Dice from '@/components/InGame/Dice/index.vue'
import TabletopModal from '@/components/UI/TabletopModal.vue'

import { log } from '@/util/logger'

import { useGameObjectsStore } from '@/stores/gameObjects'
import { connectShareDB, useShareDB } from '@/modules/useShareDB'

const gameObjects = useGameObjectsStore()

connectShareDB()

const { ShareDB } = useShareDB()

const tabletopRef = ref<HTMLElement | null>(null)

const zoomVar = useCssVar('--zoom', tabletopRef)
const zoomPercent = computed(() => Number.parseInt(zoomVar.value.replace('%', '')))

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

// ===================================================

/* add game objects only after the tabletop is mounted
   -> let the tabletop mount itself first, so that the tabletopRef is available for its children */
onMounted(() => {
  // add initial playing card
  // gameObjects.addGameObject({
  //   type: GameObjectType.PlayingCard,
  //   data: {
  //     position: {
  //       x: 10,
  //       y: 10,
  //       z: 10,
  //     },
  //     isLocked: false,
  //     isFlipped: false,
  //   },
  // })
})

// triggers every time a change occurs in store
// -> used to push local changes to automerge
gameObjects.$subscribe((mutation, state) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const event = mutation.events as any
  if (event.type === 'set' && event.key === 'position') return
  log.log('gameObjects.$subscribe()', event.type, event.key, event.newValue, event, mutation)
})
</script>

<template>
  <TabletopModal />
  <div class="overflow-auto relative h-full bg-gray-200">
    <Sidebar />
    <LogBar />
    <Dice />
    <div
      ref="tabletopRef"
      class="aspect-square flex relative items-start bg-red-400 tt-fill-viewport"
    >
      <!-- dynamically loop over game objects -->
      <template v-for="(gameObject, id) in gameObjects.objects" :key="id">
        <!-- component can be PlayingCard, PlayingObject, Dice, etc. -->
        <component
          :is="gameObject.type"
          v-show="
            gameObject.data._meta.isVisible &&
            (gameObject.data._meta.draggedBy === '' ||
              gameObject.data._meta.draggedBy === ShareDB.userId)
          "
          :id="id"
          v-model="gameObject.data"
          :tabletop-ref="tabletopRef"
        ></component>
      </template>
    </div>
  </div>
</template>

<style>
.tt-dynamic-font-size {
  font-size: v-bind(dynamicFontSize);
}
</style>
