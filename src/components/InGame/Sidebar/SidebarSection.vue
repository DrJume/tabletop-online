<template>
  <!-- fallback content, when no children are provided -->
  <div v-if="!$slots.default">
    <div
      class="group flex items-center py-2 pl-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 bg-neutral-200 hover:bg-neutral-300 rounded-md cursor-pointer"
    >
      <component
        :is="item.icon"
        class="shrink-0 mr-3 w-6 h-6 text-gray-500 group-hover:text-gray-600"
        :style="{ color: item.color }"
        aria-hidden="true"
      />
      {{ item.name }}
    </div>
  </div>

  <!-- list header -->
  <Disclosure v-else v-slot="{ open }" as="div" class="space-y-1">
    <DisclosureButton
      class="group flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left text-gray-600 hover:text-gray-900 bg-neutral-200 hover:bg-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
    >
      <component
        :is="item.icon"
        class="shrink-0 mr-3 w-6 h-6 text-gray-500 group-hover:text-gray-600"
        aria-hidden="true"
      />
      <span class="flex-1">
        {{ item.name }}
      </span>
      <svg
        :class="[
          open ? 'text-gray-500 rotate-90' : 'text-gray-400',
          'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-500 transition-colors ease-in-out duration-150',
        ]"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
      </svg>
    </DisclosureButton>

    <!-- list items -->
    <DisclosurePanel class="space-y-1">
      <slot></slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { RenderFunction } from 'vue'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

defineProps<{
  item: { icon: RenderFunction; name: string; color?: string }
}>()
</script>
