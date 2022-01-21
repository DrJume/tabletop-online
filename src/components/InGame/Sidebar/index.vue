<template>
  <TabletopSidebar
    v-model:open="sessionStore.ui.isTabletopSidebarOpen"
    orientation="left"
    caption="TabletopOnline"
  >
    <!-- Player -->
    <SidebarSection
      :item="{ name: currentUser.name, icon: UserIcon, color: currentUser.color }"
      @click="switchToUserProfileModal()"
    />

    <!-- Teammates -->
    <SidebarSection :item="{ name: 'Mitspieler', icon: UsersIcon }">
      <div
        v-for="[userId, user] in filteredTeammates"
        :key="userId"
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-default"
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
        class="group flex flex-col items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer"
      >
        <button class="flex-col items-center" @click="tabletopStore.setBoardURL(board.path)">
          <img :src="board.path" loading="lazy" width="100" class="mx-auto mb-2" />
          {{ board.name }}
        </button>
      </div>
    </SidebarSection>

    <!-- Figures -->
    <SidebarSection :item="{ name: 'Spielfiguren', icon: PuzzleIcon }">
      <div
        v-for="(figure, index) in figureItems"
        :key="index"
        class="group flex flex-col items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer"
      >
        <button class="flex-col items-center">
          <component
            :is="figure.svg"
            :style="{ color: currentUser.color }"
            @click="spawnObject(figure.svg)"
          />
          {{ figure.name }}
        </button>
      </div>
    </SidebarSection>

    <!-- Settings -->
    <SidebarSection :item="{ name: 'Einstellungen', icon: AdjustmentsIcon }">
      <div
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-default"
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
import { MapIcon, UsersIcon, PuzzleIcon, AdjustmentsIcon } from '@heroicons/vue/outline'
import { UserIcon } from '@heroicons/vue/solid'
import SidebarSection from './SidebarSection.vue'
import TabletopSidebar from '@/components/UI/TabletopSidebar.vue'
import FigureImg from '@/assets/figures/figure.svg?component'
import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'
import { computed } from 'vue'

const tabletopStore = useTabletopStore()
const sessionStore = useSessionStore()

const currentUser = computed(() => {
  if (sessionStore.userId === undefined) throw new Error('UserId is undefined')
  const user = tabletopStore.players[sessionStore.userId]

  return user
})

const switchToUserProfileModal = () => {
  sessionStore.ui.isTabletopSidebarOpen = false
  sessionStore.ui.isUserProfileModalOpen = true
}

// const userSection = computed(() => ({
//   ...currentUser.value,
//   icon: UserIcon,
// }))

const filteredTeammates = computed(() => {
  return Object.entries(tabletopStore.players).filter(([key, value]) => key !== sessionStore.userId)
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
]

const figureItems = [
  {
    name: 'Figur',
    svg: FigureImg,
  },
]

const spawnObject = (figure: any) => {
  console.log(figure, currentUser.value.color)
  tabletopStore.spawnObject({ figure, color: currentUser.value.color })
}
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
