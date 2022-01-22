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

import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'
import { playerName } from '@/util/tabletopLogFormatter'

const tabletopStore = useTabletopStore()
const sessionStore = useSessionStore()

const rollDice = () => {
  const username = tabletopStore.players[sessionStore.userId].name
  const color = tabletopStore.players[sessionStore.userId].color

  tabletopStore.printToLog(
    `${playerName({ name: username, color })} hat eine ${Math.floor(
      Math.random() * 6 + 1
    )} gewürfelt!`,
    'CubeIcon'
  )
}
</script>
