<template>
  <!-- TODO: Beim Klicken auf Listenelemente schließt sich die Liste -->
  <TabletopSidebar>
    <!-- Player -->
    <SidebarItem :item="navigation.player" />

    <!-- Teammates -->
    <SidebarItem :item="navigation.teammates">
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
    <SidebarItem :item="navigation.boards">
      <template #default="children">
        <img :src="children.item.path" loading="lazy" width="100" />
        {{ children.item.name }}
      </template>
    </SidebarItem>

    <!-- Figures -->
    <SidebarItem :item="navigation.figures">
      <template #default="children">
        <img :src="children.item.path" loading="lazy" width="50" />
        {{ children.item.name }}
      </template>
    </SidebarItem>

    <!-- Settings -->
    <SidebarItem :item="navigation.settings">
      <input type="color" />
    </SidebarItem>
  </TabletopSidebar>
</template>

<script lang="ts">
import { MapIcon, UsersIcon, UserIcon, PuzzleIcon, AdjustmentsIcon } from '@heroicons/vue/outline'
import SidebarItem from './SidebarItem.vue'
import TabletopSidebar from '@/components/UI/TabletopSidebar.vue'

const navigation = {
  player: {
    name: 'Lenny',
    icon: UserIcon,
    color: 'red',
    current: true,
  },
  teammates: {
    name: 'Mitspieler',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Raphael', color: 'blue' },
      { name: 'Julian', color: 'green' },
    ],
  },
  boards: {
    name: 'Spielbretter',
    icon: MapIcon,
    current: false,
    buttonLayout: 'flex-col',
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
    current: false,
    buttonLayout: 'flex-col',
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
    current: false,
    children: [{ name: 'backgroundColor' }],
  },
}

export default {
  components: {
    UserIcon,
    SidebarItem,
    TabletopSidebar,
  },
  setup() {
    return {
      navigation,
    }
  },
}
</script>
