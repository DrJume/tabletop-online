<template>
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
              <slot></slot>
            </nav>
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>

  <TabletopButton :data="button" @click-event="sidebarOpen = true">
    <span class="sr-only">Open sidebar</span>
  </TabletopButton>
</template>

<script lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref } from 'vue'
import { MenuAlt2Icon, XIcon } from '@heroicons/vue/outline'
import TabletopButton from './TabletopButton.vue'

const button = {
  icon: MenuAlt2Icon,
}

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
    TabletopButton,
  },

  setup() {
    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
      button,
    }
  },
}
</script>
