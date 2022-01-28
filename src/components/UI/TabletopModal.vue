<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="overflow-y-auto fixed inset-0 z-10"
      :initial-focus="getActiveElement()"
      @vnode-before-mount="updateDeferedDisplayMode()"
    >
      <div
        class="flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block overflow-hidden relative p-4 text-left align-bottom bg-neutral-100 rounded-lg shadow-xl transition-all sm:p-6 sm:my-8 sm:w-full sm:max-w-sm sm:align-middle"
          >
            <div>
              <div class="text-center">
                <DialogTitle as="h3" class="text-xl font-medium leading-6 text-gray-900">
                  <span
                    >{{
                      deferedDisplayMode === 'join'
                        ? 'Willkommen bei TabletopOnline!'
                        : 'Nutzerprofil'
                    }}
                  </span>
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Wähle einen Namen und eine Farbe.</p>
                </div>
              </div>
            </div>
            <div>
              <label for="username" class="block mt-6 text-sm font-medium text-gray-700"
                >Name</label
              >
              <div class="mt-1">
                <input
                  id="username"
                  v-model="username"
                  autocomplete="off"
                  type="text"
                  name="username"
                  class="block w-full rounded-md border-gray-300 focus:border-transparent focus:ring-2 shadow-sm sm:text-sm"
                  :style="`--tw-ring-color: ${selectedColorCSS}`"
                  @keypress.enter="isReady && submitProfile()"
                />
              </div>
            </div>

            <RadioGroup v-model="selectedColorIndex">
              <label for="username" class="block mt-5 text-sm font-medium text-gray-700"
                >Farbe</label
              >
              <div class="grid grid-cols-5 grid-rows-2 gap-3 mx-auto mt-3 w-fit">
                <RadioGroupOption
                  v-for="(color, index) in colors"
                  :key="color.name"
                  v-slot="{ active, checked }"
                  as="template"
                  :value="index"
                >
                  <div
                    :class="[
                      color.ringColor,
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                    ]"
                  >
                    <RadioGroupLabel as="p" class="sr-only">{{ color.name }}</RadioGroupLabel>
                    <span
                      :ref="
                        (el) => {
                          if (el) colorElements[index] = el as Element
                        }
                      "
                      :title="color.name"
                      aria-hidden="true"
                      :class="[
                        color.bgColor,
                        'h-8 w-8 border border-black border-opacity-10 rounded-full',
                      ]"
                    />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
            <div class="mt-10">
              <button
                type="button"
                class="group inline-flex justify-center w-full text-base font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed sm:text-sm"
                :style="`--tw-ring-color: ${selectedColorCSS}; background-color: ${selectedColorCSS};`"
                :disabled="!isValidUsername || !isReady"
                @click="submitProfile"
              >
                <span
                  class="flex justify-center items-center py-2 px-4 w-full rounded-md border border-transparent group-hover:backdrop-brightness-75 group-disabled:group-hover:backdrop-filter-none"
                >
                  {{ deferedDisplayMode === 'join' ? 'Spiel beitreten' : 'Aktualisieren' }}

                  <svg
                    v-show="!isReady"
                    class="ml-3 w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import { Player } from '@/types/player'
import { useVModel } from '@vueuse/core'

import { useSessionStore } from '@/stores/session'
const sessionStore = useSessionStore()

const getActiveElement = () => document.activeElement as HTMLElement

interface Props {
  playerProfile: Player
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'submit', mode: 'join' | 'edit', playerProfile: Player): void
}>()

const open = useVModel(props, 'open')

const username = ref(props.playerProfile.name)

const isValidUsername = computed(() => !!username.value)
const isReady = computed(() => open.value && sessionStore.user.id)

/* Display Mode */
const displayMode = computed(() => (props.playerProfile.name ? 'edit' : 'join'))
const deferedDisplayMode = ref(displayMode.value)
const updateDeferedDisplayMode = () => {
  deferedDisplayMode.value = displayMode.value
}
/*  */

/* Colors */
const colors = [
  { name: 'Red', bgColor: 'bg-red-600', ringColor: 'ring-red-600' },
  { name: 'Orange', bgColor: 'bg-orange-500', ringColor: 'ring-orange-500' },
  { name: 'Yellow', bgColor: 'bg-yellow-500', ringColor: 'ring-yellow-500' },
  { name: 'Green', bgColor: 'bg-green-600', ringColor: 'ring-green-600' },
  { name: 'Blue', bgColor: 'bg-sky-500', ringColor: 'ring-sky-500' },
  { name: 'Indigo', bgColor: 'bg-indigo-800', ringColor: 'ring-indigo-800' },
  { name: 'Purple', bgColor: 'bg-purple-600', ringColor: 'ring-purple-600' },
  { name: 'Brown', bgColor: 'bg-yellow-900', ringColor: 'ring-yellow-900' },
  { name: 'Gray', bgColor: 'bg-gray-500', ringColor: 'ring-gray-500' },
  { name: 'Black', bgColor: 'bg-gray-800', ringColor: 'ring-gray-800' },
]

const colorElements = ref<Element[]>(Array.from({ length: colors.length }))

const selectedColorIndex = ref(props.playerProfile.color ? -1 : 0)
const selectedColorCSS = computed(() => {
  if (selectedColorIndex.value === -1) return props.playerProfile.color

  const selectedColorElement = colorElements.value[selectedColorIndex.value]
  if (!selectedColorElement) return ''

  return window.getComputedStyle(selectedColorElement).backgroundColor
})
/*  */

const submitProfile = () => {
  open.value = false
  emit('submit', displayMode.value, { name: username.value, color: selectedColorCSS.value })
}
</script>
