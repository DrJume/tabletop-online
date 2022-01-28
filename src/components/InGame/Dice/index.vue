<template>
  <TabletopButton class="right-3 bottom-0" @click="rollDiceThrottled()">
    <template #icon>
      <DiceIcon class="w-10 transition ease-linear hover:-rotate-12" />
    </template>
  </TabletopButton>
</template>

<script setup lang="ts">
import TabletopButton from '@/components/UI/TabletopButton.vue'
import DiceIcon from '@/assets/dice.svg?component'

import { useThrottleFn } from '@vueuse/core'

import { useTabletopStore } from '@/stores/tabletop'
import { useSessionStore } from '@/stores/session'
import { playerName } from '@/util/tabletopLogFormatter'
import { randomIntBetween } from '@/util/numbers'

const tabletopStore = useTabletopStore()
const sessionStore = useSessionStore()

const rollDice = () => {
  const username = tabletopStore.players[sessionStore.userId].name
  const color = tabletopStore.players[sessionStore.userId].color

  const { min, max } = sessionStore.dice
  const diceResult = randomIntBetween(min, max)

  tabletopStore.printToLog(
    `${playerName({
      name: username,
      color,
    })} hat eine <code class="font-bold text-base">${diceResult}</code> gewürfelt!`,
    'CubeIcon'
  )
}

const rollDiceThrottled = useThrottleFn(rollDice, 1000, false)
</script>
