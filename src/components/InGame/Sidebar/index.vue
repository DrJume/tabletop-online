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
                <div>
                  <a
                    href="#"
                    class="group flex items-center py-2 pl-2 w-full text-sm font-medium text-gray-900 bg-gray-100 rounded-md"
                  >
                    <UserIcon
                      :style="'color: ' + navigation.player.color"
                      class="flex-shrink-0 mr-3 w-6 h-6 text-gray-500"
                      aria-hidden="true"
                    />
                    {{ navigation.player.name }}
                  </a>
                </div>

                <!-- Teammates -->
                <Disclosure v-slot="{ open }" as="div" class="space-y-1">
                  <!-- list header -->
                  <DisclosureButton
                    class="group flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <UsersIcon
                      class="flex-shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span class="flex-1"> Mitspieler </span>
                    <svg
                      :class="[
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                      ]"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </DisclosureButton>

                  <!-- list items -->
                  <DisclosurePanel class="space-y-1">
                    <DisclosureButton
                      v-for="subItem in navigation.teammates"
                      :key="subItem.name"
                      as="a"
                      class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      <UserIcon
                        class="flex-shrink-0 mr-3 w-6 h-6"
                        :style="'color: ' + subItem.color"
                        aria-hidden="true"
                      />
                      {{ subItem.name }}
                    </DisclosureButton>
                  </DisclosurePanel>
                </Disclosure>

                <!-- Boards -->
                <Disclosure v-slot="{ open }" as="div" class="space-y-1">
                  <!-- list header -->
                  <DisclosureButton
                    class="group flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <MapIcon
                      class="flex-shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span class="flex-1"> Spielbretter </span>
                    <svg
                      :class="[
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                      ]"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </DisclosureButton>

                  <!-- list items -->
                  <DisclosurePanel class="space-y-1">
                    <DisclosureButton
                      v-for="subItem in navigation.boards"
                      :key="subItem.name"
                      as="a"
                      class="group flex flex-col items-center p-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      <img :src="subItem.path" loading="lazy" width="100" />
                      {{ subItem.name }}
                    </DisclosureButton>
                  </DisclosurePanel>
                </Disclosure>

                <!-- Figures -->
                <Disclosure v-slot="{ open }" as="div" class="space-y-1">
                  <!-- list header -->
                  <DisclosureButton
                    class="group flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <PuzzleIcon
                      class="flex-shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span class="flex-1"> Figuren </span>
                    <svg
                      :class="[
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                      ]"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </DisclosureButton>

                  <!-- list items -->
                  <DisclosurePanel class="space-y-1">
                    <DisclosureButton
                      v-for="subItem in navigation.figures"
                      :key="subItem.name"
                      as="a"
                      class="group flex flex-col items-center p-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      <img :src="subItem.path" loading="lazy" width="50" />
                      {{ subItem.name }}
                    </DisclosureButton>
                  </DisclosurePanel>
                </Disclosure>

                <!-- Settings -->
                <Disclosure v-slot="{ open }" as="div" class="space-y-1">
                  <!-- list header -->
                  <DisclosureButton
                    class="group flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <AdjustmentsIcon
                      class="flex-shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span class="flex-1"> Einstellungen </span>
                    <svg
                      :class="[
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                      ]"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </DisclosureButton>

                  <!-- list items -->
                  <DisclosurePanel class="space-y-1">
                    <DisclosureButton
                      as="a"
                      href="#"
                      :current="true"
                      class="group flex flex-col items-center p-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    >
                      <input type="color" />
                    </DisclosureButton>
                  </DisclosurePanel>
                </Disclosure>
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
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import {
  AdjustmentsIcon,
  MenuAlt2Icon,
  MapIcon,
  UsersIcon,
  UserIcon,
  PuzzleIcon,
  XIcon,
} from '@heroicons/vue/outline'

const navigation = {
  player: {
    name: 'Lenny',
    color: 'red',
  },
  teammates: [
    { name: 'Raphael', color: 'blue' },
    { name: 'Julian', color: 'green' },
  ],

  boards: [
    {
      name: 'Mensch ärgere dich nicht (4 Personen)',
      path: '/assets/boards/mensch_aergere_dich_nicht_4er.svg',
    },
    {
      name: 'Mensch ärgere dich nicht (6 Personen)',
      path: '/assets/boards/mensch_aergere_dich_nicht_6er.svg',
    },
  ],
  figures: [
    {
      name: 'Figur',
      path: '/assets/figures/figure.svg',
    },
  ],
  settings: {
    children: [
      // { name: 'Overview', href: '#' },
      // { name: 'Members', href: '#' },
      // { name: 'Calendar', href: '#' },
      // { name: 'Settings', href: '#' },
    ],
  },
}

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuAlt2Icon,
    AdjustmentsIcon,
    XIcon,
    MapIcon,
    UserIcon,
    UsersIcon,
    PuzzleIcon,
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
