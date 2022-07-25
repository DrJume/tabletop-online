<script setup lang="ts">
import { connectShareDB } from '@/modules/useShareDB'

connectShareDB()
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap');
</style>
