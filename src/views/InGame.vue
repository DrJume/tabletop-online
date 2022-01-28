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
import { ref, computed, watch } from 'vue'
import { onKeyStroke, useCssVar } from '@vueuse/core'
import { useToast } from 'vue-toastification'

import Sidebar from '@/components/InGame/Sidebar/index.vue'
import LogBar from '@/components/InGame/LogBar/index.vue'
import Dice from '@/components/InGame/Dice/index.vue'
import TabletopModal from '@/components/UI/TabletopModal.vue'
import PlayingBoard from '@/components/InGame/Tabletop/GameComponents/PlayingBoard.vue'
import TabletopNotification from '@/components/UI/TabletopNotification.vue'

import { Player } from '@/types/player'

import { log } from '@/util/logger'

import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'
import { playerName } from '@/util/tabletopLogFormatter'

const tabletopStore = useTabletopStore()
const sessionStore = useSessionStore()

const tabletopRef = ref<HTMLElement | null>(null)

const zoomVar = useCssVar('--zoom', tabletopRef)
const zoomPercent = computed(() => Number.parseInt(zoomVar.value.replace('%', '')))

onKeyStroke('+', () => {
  zoomVar.value = `${zoomPercent.value + 5}%`
})
onKeyStroke('0', () => {
  zoomVar.value = '100%'
})
onKeyStroke('-', () => {
  // zooming out of playarea is not permitted
  // if (zoomPercent.value <= 100) return

  zoomVar.value = `${zoomPercent.value - 5}%`
})

const dynamicFontSize = computed(() => `${(zoomPercent.value / 100) * 1.25}rem`)

//

// triggers every time a change occurs in store
tabletopStore.$subscribe((mutation, state) => {
  // don't log 'direct' mutations because it spams
  if (mutation?.type === 'direct') return

  log.log('tabletopStore.$subscribe()', mutation)
})

const submitProfile = (mode: 'join' | 'edit', { name, color }: Player) => {
  log.log('submitProfile()', mode, { name, color })

  const profileBefore = { ...sessionStore.user }
  sessionStore.$patch({ user: { name, color } })
  tabletopStore.playerUpdate({ name, color })

  switch (mode) {
    case 'join': {
      tabletopStore.printToLog(
        `${playerName({ name, color })} ist dem Spiel beigetreten.`,
        'UserAddIcon'
      )
      break
    }

    case 'edit': {
      tabletopStore.printToLog(
        `${playerName({
          name: profileBefore.name,
          color: profileBefore.color,
        })} ist jetzt ${playerName({ name, color })}.`,
        'SparklesIcon'
      )
      break
    }

    default: {
      break
    }
  }
}

const toast = useToast()

watch(
  () => tabletopStore.log,
  (log) => {
    if (log.length === 0) return
    const newestLog = log[log.length - 1]

    // don't show notifications older than 10s
    if (newestLog.timestamp + 10 * 1000 /* ms */ < Date.now()) return

    toast({
      component: TabletopNotification,
      props: {
        title: newestLog.message,
        icon: newestLog.icon,
      },
    })
  },
  { deep: true }
)
</script>

<template>
  <TabletopModal
    v-model:open="sessionStore.ui.isUserProfileModalOpen"
    :player-profile="sessionStore.user"
    @submit="submitProfile"
  />
  <div class="overflow-auto relative h-full bg-neutral-200">
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

<!-- vue-toastification custom styling -->
<style lang="scss">
@use './node_modules/vue-toastification/src/scss/index.scss';

.Vue-Toastification__toast {
  --min-height: calc(64px - 2 * 4px - 2 * 4px);
  @apply p-0 mr-20 bg-transparent min-h-[var(--min-height)] font-sans;
}

.Vue-Toastification__toast-component-body > * {
  @apply h-full;
}

.Vue-Toastification__progress-bar {
  @apply bg-gray-600/20 h-1;
}
</style>
