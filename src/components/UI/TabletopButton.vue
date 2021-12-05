<script setup lang="ts">
import { inject } from 'vue'
const props = defineProps({
  buttonLabel: {
    type: String,
    default: 'Klick mich',
  },
})

const hello = inject('111')

const emit = defineEmits(['click', 'timeoutEvent'])

setTimeout(() => {
  emit('timeoutEvent')
}, 2000)
</script>

<template>
  <button class="p-2 bg-gray-300 rounded-lg">
    {{ buttonLabel }}
  </button>
</template>
