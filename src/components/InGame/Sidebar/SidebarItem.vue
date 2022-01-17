<template>
  <!-- fallback content, when no children are provided -->
  <div v-if="!item.children">
    <a
      href="#"
      :class="[
        item.current
          ? 'bg-gray-100 text-gray-900'
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
      ]"
    >
      <component
        :is="item.icon"
        :class="[
          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
          'mr-3 flex-shrink-0 h-6 w-6',
        ]"
        :style="'color: ' + item.color"
        aria-hidden="true"
      />
      {{ item.name }}
    </a>
  </div>

  <!-- list header -->
  <Disclosure v-else v-slot="{ open }" as="div" class="space-y-1">
    <DisclosureButton
      :class="[
        item.current
          ? 'bg-gray-100 text-gray-900'
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
      ]"
    >
      <component
        :is="item.icon"
        class="flex-shrink-0 mr-3 w-6 h-6 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span class="flex-1">
        {{ item.name }}
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
      <DisclosureButton
        v-for="subItem in item.children"
        :key="subItem.name"
        as="a"
        :class="item.buttonLayout"
        class="group flex items-center py-2 pr-2 pl-11 w-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
      >
        <slot :item="subItem"></slot>
      </DisclosureButton>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return props.item
  },
})
</script>
