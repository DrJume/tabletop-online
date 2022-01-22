<!-- eslint-disable vue/no-v-html -->
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <TransitionRoot
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  > -->
  <div
    class="overflow-hidden w-full max-w-sm break-all bg-white rounded-lg ring-1 ring-black shadow-lg pointer-events-auto ring-opacity-5"
  >
    <div class="p-3">
      <div class="flex items-center">
        <div class="shrink-0">
          <component
            :is="(heroIcons as any)[icon]"
            class="w-6 h-6 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <div class="flex-1 ml-3 w-0">
          <p
            class="text-sm font-medium text-gray-700"
            v-html="DomPurify.sanitize(props.title, { USE_PROFILES: { html: true } })"
          ></p>
        </div>
        <div class="flex shrink-0 ml-4">
          <button
            class="inline-flex text-gray-500 hover:text-gray-600 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            @click="$emit('close-toast')"
          >
            <span class="sr-only">Close</span>
            <XIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </TransitionRoot> -->
</template>

<script setup lang="ts">
import { XIcon } from '@heroicons/vue/solid'
import DomPurify from 'dompurify'
import * as heroIcons from '@heroicons/vue/outline'

defineEmits<{
  (e: 'close-toast'): void
}>()

const props = defineProps<{
  title: string
  icon: string
}>()
</script>
