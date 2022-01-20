<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="overflow-y-auto fixed inset-0 z-10">
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
          <DialogOverlay class="fixed inset-0 bg-gray-500 transition-opacity bg-opacity-75" />
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
            class="inline-block overflow-hidden relative p-4 text-left align-bottom bg-white rounded-lg shadow-xl transition-all sm:p-6 sm:my-8 sm:w-full sm:max-w-sm sm:align-middle"
          >
            <div>
              <div class="text-center">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Willkommen bei TabletopOnline!
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Wähle einen Namen und eine Farbe.</p>
                </div>
              </div>
            </div>
            <div>
              <label for="username" class="block mt-5 text-sm font-medium text-gray-700"
                >Name</label
              >
              <div class="mt-1">
                <input
                  id="username"
                  autocomplete="off"
                  type="text"
                  name="username"
                  class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <RadioGroup v-model="selectedColor">
              <label for="username" class="block mt-5 text-sm font-medium text-gray-700"
                >Farbe</label
              >
              <div class="flex justify-center items-center mt-1 space-x-3">
                <RadioGroupOption
                  v-for="color in colors"
                  :key="color.name"
                  v-slot="{ active, checked }"
                  as="template"
                  :value="color"
                >
                  <div
                    :class="[
                      color.selectedColor,
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                    ]"
                  >
                    <RadioGroupLabel as="p" class="sr-only">{{ color.name }}</RadioGroupLabel>
                    <span
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
                class="inline-flex justify-center py-2 px-4 w-full text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm sm:text-sm"
                @click="open = false"
              >
                Spiel beitreten
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const colors = [
  { name: 'Red', bgColor: 'bg-red-600', selectedColor: 'ring-red-600' },
  { name: 'Yellow', bgColor: 'bg-yellow-400', selectedColor: 'ring-yellow-400' },
  { name: 'Green', bgColor: 'bg-green-600', selectedColor: 'ring-green-600' },
  { name: 'Blue', bgColor: 'bg-sky-600', selectedColor: 'ring-sky-600' },
  { name: 'Purple', bgColor: 'bg-purple-600', selectedColor: 'ring-purple-600' },
  { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
]

const open = ref(true)
const selectedColor = ref(colors[1])
</script>
