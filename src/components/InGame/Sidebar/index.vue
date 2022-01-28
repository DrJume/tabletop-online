<template>
  <TabletopSidebar
    v-model:open="sessionStore.ui.isTabletopSidebarOpen"
    orientation="left"
    caption="TabletopOnline"
  >
    <!-- Player -->
    <SidebarSection
      :item="{ name: sessionStore.user.name, icon: UserIcon, color: sessionStore.user.color }"
      @click="switchToUserProfileModal()"
    />

    <!-- Teammates -->
    <SidebarSection :item="{ name: 'Mitspieler', icon: UsersIcon }">
      <div
        v-for="[userId, user] in filteredTeammates"
        :key="userId"
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md cursor-default"
      >
        <UserIcon class="shrink-0 mr-3 w-6 h-6" :style="{ color: user.color }" aria-hidden="true" />
        {{ user.name }}
      </div>
    </SidebarSection>

    <!-- Boards -->
    <SidebarSection :item="{ name: 'Spielbretter', icon: MapIcon }">
      <div
        v-for="(board, index) in boardItems"
        :key="index"
        class="group flex flex-col items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
      >
        <button
          class="flex-col items-center font-medium"
          @click="tabletopStore.setBoardURL(board.path)"
        >
          <img
            v-if="board.path"
            :src="board.path"
            loading="lazy"
            width="100"
            class="mx-auto mb-2"
          />
          {{ board.name }}
        </button>
      </div>
    </SidebarSection>

    <!-- Figures -->
    <SidebarSection :item="{ name: 'Spielfiguren', icon: PuzzleIcon }">
      <div
        v-for="(figure, index) in figureItems"
        :key="index"
        class="group flex flex-col items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
      >
        <button class="flex-col items-center font-medium">
          <component
            :is="figure.svg"
            :style="{ color: sessionStore.user.color }"
            @click="
              tabletopStore.addGameObject({
                type: GameObjectType.PlayingObject,
                data: {
                  position: {
                    x: 50 - 3 / 2 + upToNDigits(randomFloatBetween(-10, 10), 1),
                    y: 50 - 6 / 3 + upToNDigits(randomFloatBetween(-10, 10), 1),
                    z: 10,
                  },
                  isLocked: false,
                  color: sessionStore.user.color,
                  // image: figure,
                },
              })
            "
          />
          {{ figure.name }}
        </button>
      </div>
    </SidebarSection>

    <!-- Settings -->
    <SidebarSection :item="{ name: 'Einstellungen', icon: AdjustmentsIcon }">
      <div
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md cursor-default"
      >
        <div class="flex-auto">Hintergrundfarbe</div>
        <input
          v-model="sessionStore.ui.tabletopBackgroundColor"
          type="color"
          class="cursor-pointer color-input"
        />
      </div>
    </SidebarSection>
  </TabletopSidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { MapIcon, UsersIcon, PuzzleIcon, AdjustmentsIcon } from '@heroicons/vue/outline'
import { UserIcon } from '@heroicons/vue/solid'
import SidebarSection from './SidebarSection.vue'
import TabletopSidebar from '@/components/UI/TabletopSidebar.vue'
import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'

import { GameObjectType } from '@/types/gameObject'

import { randomFloatBetween, upToNDigits } from '@/util/numbers'

import FigureImg from '@/assets/figures/figure.svg?component'

const tabletopStore = useTabletopStore()
const sessionStore = useSessionStore()

const switchToUserProfileModal = () => {
  sessionStore.ui.isTabletopSidebarOpen = false
  sessionStore.ui.isUserProfileModalOpen = true
}

const filteredTeammates = computed(() => {
  return Object.entries(tabletopStore.players).filter(
    ([key, value]) => key !== sessionStore.user.id
  )
})

const boardItems = [
  {
    name: 'Kein Spielbrett',
    path: '',
  },
  {
    name: 'Mensch ärgere dich nicht (4 Personen)',
    path: '/assets/boards/mensch_aergere_dich_nicht_4er.svg',
  },
  {
    name: 'Mensch ärgere dich nicht (6 Personen)',
    path: '/assets/boards/mensch_aergere_dich_nicht_6er.svg',
  },
  {
    name: 'Halma',
    path: '/assets/boards/halma.svg',
  },
]

const figureItems = [
  {
    name: 'Figur',
    svg: FigureImg,
  },
]
</script>

<style scoped>
@keyframes rainbow {
  100%,
  0% {
    color: rgb(255, 0, 0);
  }
  8% {
    color: rgb(255, 127, 0);
  }
  16% {
    color: rgb(255, 255, 0);
  }
  25% {
    color: rgb(127, 255, 0);
  }
  33% {
    color: rgb(0, 255, 0);
  }
  41% {
    color: rgb(0, 255, 127);
  }
  50% {
    color: rgb(0, 255, 255);
  }
  58% {
    color: rgb(0, 127, 255);
  }
  66% {
    color: rgb(0, 0, 255);
  }
  75% {
    color: rgb(127, 0, 255);
  }
  83% {
    color: rgb(255, 0, 255);
  }
  91% {
    color: rgb(255, 0, 127);
  }
}

.tt-rainbow {
  animation: rainbow 1s linear;
  animation-iteration-count: infinite;
}
</style>
