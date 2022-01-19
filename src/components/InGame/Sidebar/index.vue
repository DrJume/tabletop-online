<template>
  <TabletopSidebar orientation="left" caption="TabletopOnline">
    <!-- Player -->
    <SidebarItem :item="navigation.player" />

    <!-- Teammates -->
    <SidebarItem :item="navigation.teammates" item-style="cursor-default pl-11">
      <template #default="children">
        <UserIcon
          class="flex-shrink-0 mr-3 w-6 h-6"
          :style="'color: ' + children.item.color"
          aria-hidden="true"
        />
        {{ children.item.name }}
      </template>
    </SidebarItem>

    <!-- Boards -->
    <SidebarItem :item="navigation.boards" item-style="flex-col cursor-pointer">
      <template #default="children">
        <img :src="children.item.path" loading="lazy" width="100" class="mb-2" />
        {{ children.item.name }}
      </template>
    </SidebarItem>

    <!-- Figures -->
    <SidebarItem :item="navigation.figures" item-style="flex-col cursor-pointer">
      <template #default="children">
        <img :src="children.item.path" loading="lazy" width="50" class="mb-2" />
        {{ children.item.name }}
      </template>
    </SidebarItem>

    <!-- Settings -->
    <SidebarItem :item="navigation.settings" item-style="pl-11 cursor-default">
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
        path: '/assets/figures/figure.svg',
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
