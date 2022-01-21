<template>
  <img :src="src" :class="{ hidden: !src }" class="flex w-[55%] h-[55%] z-1" />
</template>

<script setup lang="ts">
defineProps<{ src: string }>()
</script>
