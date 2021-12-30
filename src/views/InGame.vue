<script lang="ts">
import PlayingCard from '@/components/InGame/Tabletop/GameComponents/PlayingCard.vue'
import PlayingBoard from '@/components/InGame/Tabletop/GameComponents/PlayingBoard.vue'
import PlayingObject from '@/components/InGame/Tabletop/GameComponents/PlayingObject.vue'
import Dice from '@/components/InGame/Tabletop/GameComponents/Dice.vue'

export default {
  components: {
    PlayingCard,
    PlayingBoard,
    PlayingObject,
    Dice,
  },
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onKeyStroke, useCssVar } from '@vueuse/core'

// sharedb socket
// import ReconnectingWebSocket from 'reconnecting-websocket'
// import { Connection } from 'sharedb/lib/client'
// import type { Socket } from 'sharedb/lib/sharedb'

// const socket = new ReconnectingWebSocket('ws://localhost:8080')
// const connection = new Connection(socket as Socket)

// const doc = connection.get('doc-collection', 'doc-id')

// doc.subscribe((error) => {
//   if (error) return console.error(error)

//   console.log('subscribe', JSON.stringify(doc.data))

//   // If doc.type is undefined, the document has not been created, so let's create it
//   if (!doc.type) {
//     doc.create({ idCounter: 0, objects: {} }, (error) => {
//       console.log('doc created')
//       if (error) console.error(error)

//       // create new card and increment idCounter
//       doc.submitOp([
//         { p: ['objects', doc.data.idCounter], oi: { x: 0, y: 0, isLocked: false } },
//         { p: ['idCounter'], na: 1 },
//       ])
//     })
//   }

//   if (doc.data.objects['0']) {
//     updateCard()
//     isVisible.value = true
//   }

//   // combine all operations into one with 'op batch'
//   doc.on('op batch', (op) => {
//     if (hasDragged.value) return
//     if (!isVisible.value) isVisible.value = true

//     console.log('op batch', op)
//     updateCard()
//   })
// })

// doc.on('load', () => {
//   console.log('load', JSON.stringify(doc.data))
// })

const tabletopRef = ref<HTMLElement | null>(null)

// TODO: global sharedb listener that pushes changes to store

const zoomVar = useCssVar('--zoom', tabletopRef)
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

// ===================================================

import { useGameObjectsStore, GameObjectType } from '@/stores/gameObjects'
const gameObjects = useGameObjectsStore()

// add game objects only after the tabletop is mounted
// -> let the tabletop mount itself first, so that the tabletopRef is available for its children
onMounted(() => {
  // add initial playing card
  gameObjects.addGameObject({
    type: GameObjectType.PlayingCard,
    data: {
      x: 0,
      y: 0,
      isLocked: false,
      isFlipped: false,
    },
  })
})
</script>

<template>
  <div class="overflow-auto h-full bg-gray-200">
    <div
      ref="tabletopRef"
      class="aspect-square flex relative items-start bg-red-400 tt-fill-viewport"
    >
      <!-- dynamically load in objects -->
      <template v-for="(gameObject, id) in gameObjects.objects" :key="id">
        <!-- component can be PlayingCard, PlayingObject, Dice, etc. -->
        <component
          :is="gameObject.type"
          v-show="gameObject.meta.isVisible"
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
