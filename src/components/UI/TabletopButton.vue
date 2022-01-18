<template>
  <button
    type="button"
    class="flex absolute z-10 items-center p-3 m-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
    @click="buttonClicked"
  >
    <slot></slot>
    <component :is="heroIcons[$props.icon]" class="w-6 h-6" aria-hidden="true" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as heroIcons from '@heroicons/vue/outline'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
      default: 'MenuAlt2Icon',
    },
  },
  emits: {
    clickEvent: null,
  },
  setup() {
    return {
      heroIcons,
    }
  },
  methods: {
    buttonClicked() {
      this.$emit('clickEvent')
    },
  },
})
</script>
