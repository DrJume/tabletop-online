<template>
  <TabletopButton class="right-0 bottom-0" @click-event="rollDice">
    <template #icon>
      <DiceIcon class="w-10 transition ease-linear hover:-rotate-12" />
    </template>
  </TabletopButton>
</template>

<script lang="ts">
import TabletopButton from '@/components/UI/TabletopButton.vue'
import DiceIcon from '@/assets/dice.svg?component'

export default {
  components: {
    DiceIcon,
    TabletopButton,
  },
  methods: {
    rollDice() {
      alert('Du hast eine ' + Math.ceil(Math.random() * (6 - 1)) + ' gewürfelt!')
    },
  },
}
</script>
