<template>
  <div>
    <!-- TODO: Beim Klicken auf Listenelemente schließt sich die Liste -->
    <!-- TODO: Auslagern der einzelnen Listen (die sich doppeln) als extra Komponente -->
    <!-- TODO: ordentliche Styles --->

    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="flex fixed inset-0 z-40" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-white bg-opacity-0" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div class="flex relative flex-col flex-1 pt-5 pb-4 w-full max-w-xs bg-indigo-700">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  type="button"
                  class="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="w-6 h-6 text-gray-700" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <h2>TabletopOnline</h2>
            </div>
            <div class="overflow-y-auto flex-1 mt-5 h-0">
              <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
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
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <button
      type="button"
      class="flex absolute z-10 items-center p-3 m-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
      @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <MenuAlt2Icon class="w-6 h-6" aria-hidden="true" />
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  // AdjustmentsIcon,
  MenuAlt2Icon,
  MapIcon,
  UsersIcon,
  UserIcon,
  PuzzleIcon,
  XIcon,
  AdjustmentsIcon,
} from '@heroicons/vue/outline'
import SidebarItem from './SidebarItem.vue'

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
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuAlt2Icon,
    XIcon,
    UserIcon,
    SidebarItem,
  },
  setup() {
    const sidebarOpen = ref(false)

    return {
      navigation,
      sidebarOpen,
    }
  },
}
</script>
