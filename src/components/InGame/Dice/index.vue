<template>
  <TabletopButton class="right-3 bottom-0" @click="rollDice()">
    <template #icon>
      <DiceIcon class="w-10 transition ease-linear hover:-rotate-12" />
    </template>
  </TabletopButton>
</template>

<script setup lang="ts">
import TabletopButton from '@/components/UI/TabletopButton.vue'
import DiceIcon from '@/assets/dice.svg?component'

const rollDice = () => {
  alert('Du hast eine ' + Math.ceil(Math.random() * (6 - 1)) + ' gewürfelt!')
}
</script>
