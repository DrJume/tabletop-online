<script setup lang="ts">
import { useTabletopSocket } from '@/modules/useTabletopSocket'
import { connectShareDB } from '@/modules/useShareDB'

useTabletopSocket
connectShareDB()
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
</style>
