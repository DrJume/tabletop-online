<template>
  <button
    type="button"
    class="flex fixed z-10 items-center p-3 m-5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm flexfixed"
    @click="emit('click')"
  >
    <slot></slot>
    <slot name="icon">
      <component
        :is="props.icon && (heroIcons as any)[props.icon]"
        class="w-6 h-6"
        aria-hidden="true"
      />
    </slot>
  </button>
</template>

<script setup lang="ts">
import * as heroIcons from '@heroicons/vue/outline'

const props = defineProps<{
  icon?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
