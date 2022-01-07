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

import { log } from '@/util/logger'

// sharedb socket
import { useShareDB } from '@/modules/useShareDB'
import { useUserID } from '@/modules/useUserID'
const { doc } = useShareDB()
const { userID } = useUserID()

import { useGameObjectsStore, GameObjectType } from '@/stores/gameObjects'

const gameObjects = useGameObjectsStore()

// get doc stream
doc.subscribe((error) => {
  if (error) return log.error(error)

  // load current version of the game, when the player joins
  userID.value = doc.data._meta.userCounter
  gameObjects._meta = doc.data._meta
  gameObjects.objects = doc.data.objects

  doc.submitOp({ p: ['_meta', 'userCounter'], na: 1 })

  log.log('subscribe', JSON.stringify(doc.data))

  // a change occured in the database
  // combine all operations into one with 'op batch'
  doc.on('op batch', (ops) => {
    log.log('op batch', ops)

    // check if op was oi
    // {p:['objects', 'id', 'data', 'key'], oi:obj}
    for (const op of ops) {
      const path = [...op.p] as string[]
      let pathData = gameObjects

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const lastPath = path.pop()
      const objectId = path[1]
      for (const property of path) {
        log.log(property)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pathData = pathData[property]
      }

      if ('oi' in op) {
        // an existing value changed
        log.log(pathData, userID.value)

        // if changes are received that were created by the player itself, don't update
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (gameObjects[objectId].data._meta.draggedBy === userID.value) {
          log.log('NEIN ICH AKTUALISIERE MICH NICHT MEHR')
          return
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pathData[lastPath] = op.oi

        log.log(pathData, op.oi)
      } else if ('na' in op) {
        // a value got incremented

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pathData[lastPath] += op.na
      }
    }

    // TODO: li - insert
  })
})

doc.on('load', () => {
  log.log('load', JSON.stringify(doc.data))
})

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

// triggers every time a change occurs in store
// -> used to push local changes to automerge
gameObjects.$subscribe((mutation, state) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const event = mutation.events as any
  log.debug(event.type, event.key, event.newValue, event)
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
          v-show="gameObject.data._meta.isVisible"
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
