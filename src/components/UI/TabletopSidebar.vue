<template>
  <!-- TODO: ordentliche Styles --->

  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="flex fixed inset-0 z-40"
      :class="props.orientation == 'right' ? 'justify-end' : ''"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-transparent" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        :enter-from="props.orientation == 'right' ? 'translate-x-full' : '-translate-x-full'"
        :enter-to="props.orientation == 'right' ? '-translate-x-0' : 'translate-x-0'"
        leave="transition ease-in-out duration-300 transform"
        :leave-from="props.orientation == 'right' ? 'translate-x-0' : '-translate-x-0'"
        :leave-to="props.orientation == 'right' ? 'translate-x-full' : '-translate-x-full'"
      >
        <div
          class="flex relative flex-col flex-1 pt-5 pb-4 w-full max-w-xs bg-indigo-700"
          :class="props.orientation == 'right' ? 'order-1' : ''"
        >
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="absolute top-0 pt-2"
              :class="props.orientation == 'right' ? 'left-0 -ml-12' : 'right-0 -mr-12'"
            >
              <button
                type="button"
                class="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="sidebarOpen = false"
              >
                <span class="sr-only">Close sidebar</span>
                <XIcon class="w-6 h-6 text-gray-700" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <div class="flex shrink-0 items-center px-4">
            <h2>{{ props.caption }}</h2>
          </div>
          <div class="overflow-y-auto flex-1 mt-5 h-0">
            <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
              <slot></slot>
            </nav>
          </div>
        </div>
      </TransitionChild>
      <div class="shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>

  <TabletopButton
    :icon="props.buttonIcon"
    :class="props.orientation == 'right' ? 'right-3' : ''"
    @click="sidebarOpen = true"
  >
    <span class="sr-only">Open sidebar</span>
  </TabletopButton>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

import TabletopButton from '@/components/UI/TabletopButton.vue'

interface Props {
  open: boolean
  orientation?: string
  caption?: string
  buttonIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'left',
  caption: '',
  buttonIcon: 'MenuAlt2Icon',
})

const sidebarOpen = useVModel(props, 'open')
</script>
