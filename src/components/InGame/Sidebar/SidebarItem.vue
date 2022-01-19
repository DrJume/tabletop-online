<template>
  <!-- fallback content, when no children are provided -->
  <div v-if="!props.item.children">
    <div
      class="group flex items-center py-2 pl-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-md"
    >
      <component
        :is="props.item.icon"
        class="shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
        :style="'color: ' + props.item.color"
        aria-hidden="true"
      />
      {{ props.item.name }}
    </div>
  </div>

  <!-- list header -->
  <Disclosure v-else v-slot="{ open }" as="div" class="space-y-1">
    <DisclosureButton
      class="group flex items-center py-2 pr-1 pl-2 w-full text-sm font-medium text-left text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <component
        :is="props.item.icon"
        class="shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span class="flex-1">
        {{ props.item.name }}
      </span>
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
      <div
        v-for="subItem in props.item.children"
        :key="subItem.name"
        :class="props.itemStyle"
        class="group flex items-center py-2 pr-2 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
      >
        <slot :item="subItem"></slot>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const props = defineProps<{
  item: {
    name: string
    icon: string
    color?: string
    children?: ({ name: string } & ({ color: string } | { path: string } | { svg: string }))[]
  }
  itemStyle: string
}>()
</script>
