<template>
  <TabletopSidebar orientation="left" caption="TabletopOnline">
    <!-- Player -->
    <SidebarItem :item="navigation.player" />

    <!-- Teammates -->
    <SidebarItem :item="navigation.teammates" item-style="cursor-default pl-11">
      <template #default="{ item }">
        <UserIcon
          class="shrink-0 mr-3 w-6 h-6"
          :style="'color: ' + item.color"
          aria-hidden="true"
        />
        {{ item.name }}
      </template>
    </SidebarItem>

    <!-- Boards -->
    <SidebarItem :item="navigation.boards" item-style="flex-col cursor-pointer">
      <template #default="{ item }">
        <button class="flex-col items-center">
          <img :src="item.path" loading="lazy" width="100" class="mx-auto mb-2" />
          {{ item.name }}
        </button>
      </template>
    </SidebarItem>

    <!-- Figures -->
    <SidebarItem :item="navigation.figures" item-style="flex-col cursor-pointer">
      <template #default="{ item }">
        <button class="flex-col items-center">
          <component :is="item.svg" style="color: red" />
          {{ item.name }}
        </button>
      </template>
    </SidebarItem>

    <!-- Settings -->
    <SidebarItem :item="navigation.settings" item-style="pl-11">
      <div class="flex-auto">Hintergrundfarbe</div>
      <input type="color" class="cursor-pointer color-input" />
    </SidebarItem>
  </TabletopSidebar>
</template>

<script setup lang="ts">
import { MapIcon, UsersIcon, PuzzleIcon, AdjustmentsIcon } from '@heroicons/vue/outline'
import { UserIcon } from '@heroicons/vue/solid'
import SidebarItem from './SidebarItem.vue'
import TabletopSidebar from '@/components/UI/TabletopSidebar.vue'
import FigureImg from '@/assets/figures/figure.svg?component'

const navigation = {
  player: {
    name: 'Lenny',
    icon: UserIcon,
    color: 'red',
  },
  teammates: {
    name: 'Mitspieler',
    icon: UsersIcon,
    children: [
      { name: 'Raphael', color: 'blue' },
      { name: 'Julian', color: 'green' },
    ],
  },
  boards: {
    name: 'Spielbretter',
    icon: MapIcon,
    children: [
      {
        name: 'Mensch ärgere dich nicht (4 Personen)',
        path: '/assets/boards/mensch_aergere_dich_nicht_4er.svg',
      },
      {
        name: 'Mensch ärgere dich nicht (6 Personen)',
        path: '/assets/boards/mensch_aergere_dich_nicht_6er.svg',
      },
    ],
  },
  figures: {
    name: 'Spielfiguren',
    icon: PuzzleIcon,
    children: [
      {
        name: 'Figur',
        svg: FigureImg,
      },
    ],
  },
  settings: {
    name: 'Einstellungen',
    icon: AdjustmentsIcon,
    children: [{ name: 'backgroundColor' }],
  },
}
</script>
