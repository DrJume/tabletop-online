<script lang="ts">
import PlayingObject from '@/components/InGame/Tabletop/GameComponents/PlayingObject.vue'
import PlayingCard from '@/components/InGame/Tabletop/GameComponents/PlayingCard.vue'

export default {
  components: {
    PlayingObject,
    PlayingCard,
  },
}
</script>

<script setup lang="ts">
import PlayingBoard from '@/components/InGame/Tabletop/GameComponents/PlayingBoard.vue'

import { ref, computed } from 'vue'
import { onKeyStroke, useCssVar } from '@vueuse/core'
import Sidebar from '@/components/InGame/Sidebar/index.vue'
import LogBar from '@/components/InGame/LogBar/index.vue'
import Dice from '@/components/InGame/Dice/index.vue'
import TabletopModal from '@/components/UI/TabletopModal.vue'
import { Player } from '@/types/player'

import { log } from '@/util/logger'

import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'

const tabletopStore = useTabletopStore()
const sessionStore = useSessionStore()

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

//

// triggers every time a change occurs in store
tabletopStore.$subscribe((mutation, state) => {
  // don't log 'direct' mutations because it spams
  if (mutation?.type === 'direct') return

  log.log('tabletopStore.$subscribe()', mutation)
})

const submitProfile = ({ name, color }: Player) => {
  log.log('submitProfile()', { name, color })
  tabletopStore.playerUpdate({ name, color })
}

const tabletopModalOptions = computed(
  (): { mode: 'join' | 'change'; username?: string; color?: string } => {
    // the player has not yet joined, when userId is not in the player list
    if (!sessionStore._userId || !tabletopStore.players[sessionStore._userId]) {
      return {
        mode: 'join',
        username: undefined,
        color: undefined,
      }
    }
    return {
      mode: 'change',
      username: tabletopStore.players[sessionStore._userId].name,
      color: tabletopStore.players[sessionStore._userId].color,
    }
  }
)
</script>

<template>
  <TabletopModal
    v-model:open="sessionStore.ui.isUserProfileModalOpen"
    :mode="tabletopModalOptions.mode"
    :username="tabletopModalOptions.username"
    :current-color="tabletopModalOptions.color"
    @submit="submitProfile"
  />
  <div class="overflow-auto relative h-full bg-gray-200">
    <Sidebar />
    <LogBar />
    <Dice />
    <div
      ref="tabletopRef"
      class="aspect-square flex isolate relative justify-center items-center tt-fill-viewport"
      :style="{ backgroundColor: sessionStore.ui.tabletopBackgroundColor }"
    >
      <PlayingBoard :src="tabletopStore._meta.boardURL" />
      <!-- dynamically loop over game objects -->
      <template v-for="(gameObject, id) in tabletopStore.objects" :key="id">
        <!-- component can be PlayingCard, PlayingObject, Dice, etc. -->
        <component
          :is="gameObject.type"
          v-show="gameObject.data._meta.isVisible"
          v-model="gameObject.data"
          :object-id="id"
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
