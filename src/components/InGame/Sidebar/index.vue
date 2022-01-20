<template>
  <TabletopSidebar orientation="left" caption="TabletopOnline">
    <!-- Player -->
    <SidebarSection :item="playerSection" />

    <!-- Teammates -->
    <SidebarSection :item="teammateSection">
      <div
        v-for="(player, index) in tabletopStore.players"
        :key="index"
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-default"
      >
        <UserIcon
          class="shrink-0 mr-3 w-6 h-6"
          :style="'color:' + player.color"
          aria-hidden="true"
        />
        {{ player.name }}
      </div>
    </SidebarSection>

    <!-- Boards -->
    <SidebarSection :item="boardSection">
      <div
        v-for="(board, index) in boardItems"
        :key="index"
        class="group flex flex-col items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer"
      >
        <button class="flex-col items-center">
          <img :src="board.path" loading="lazy" width="100" class="mx-auto mb-2" />
          {{ board.name }}
        </button>
      </div>
    </SidebarSection>

    <!-- Figures -->
    <SidebarSection :item="figureSection">
      <div
        v-for="(figure, index) in figureItems"
        :key="index"
        class="group flex flex-col items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer"
      >
        <button class="flex-col items-center">
          <component :is="figure.svg" style="color: red" />
          {{ figure.name }}
        </button>
      </div>
    </SidebarSection>

    <!-- Settings -->
    <SidebarSection :item="settingsSection">
      <div
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-default"
      >
        <div class="flex-auto">Hintergrundfarbe</div>
        <input type="color" class="cursor-pointer color-input" />
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

const tabletopStore = useTabletopStore()

const playerSection = {
  name: 'Player',
  icon: UserIcon,
  color: 'red',
}

const teammateSection = {
  name: 'Mitspieler',
  icon: UsersIcon,
}

const boardSection = {
  name: 'Spielbretter',
  icon: MapIcon,
}

const boardItems = [
  {
    name: 'Mensch ärgere dich nicht (4 Personen)',
    path: '/assets/boards/mensch_aergere_dich_nicht_4er.svg',
  },
  {
    name: 'Mensch ärgere dich nicht (6 Personen)',
    path: '/assets/boards/mensch_aergere_dich_nicht_6er.svg',
  },
]

const figureSection = {
  name: 'Spielfiguren',
  icon: PuzzleIcon,
}

const figureItems = [
  {
    name: 'Figur',
    svg: FigureImg,
  },
]

const settingsSection = {
  name: 'Einstellungen',
  icon: AdjustmentsIcon,
}
</script>
