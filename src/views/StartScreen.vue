<script setup lang="ts">
import { reactive, ref, watch, computed, provide } from 'vue'

import TabletopButton from '@/components/UI/TabletopButton.vue'

import { useAlter } from '@/modules/useAlter'
import { useState } from '@/modules/useState'

const { alter, istVolljaehrig } = useAlter()
const { alter: alter2, istVolljaehrig: istVolljaehrig2 } = useAlter()

const { state } = useState()

const hello = reactive({ text: 'Hello World' })
const bold = reactive({ value: 'bold' })

const refTest = reactive({ text: 'hi', bild: 'rot' })

provide('111', hello)

const buttonClick = (e, a, b) => {
  alter.value++
  console.log(e, a, b)
  state.a++
}

setTimeout(() => {
  hello.text = 'NEIN'
}, 2000)
</script>

<template>
  <h1 :style="'font-weight:' + bold.value">{{ hello.text }}</h1>
  <h2>{{ alter }}</h2>
  <h2>{{ alter2 }}</h2>
  <h2>{{ istVolljaehrig ? 'volljaehrig' : 'minderjaehrig' }}</h2>
  <h2>{{ istVolljaehrig2 }}</h2>
  <h2>{{ istVolljaehrig }}</h2>
  <h2>{{ istVolljaehrig }}</h2>
  <h2>{{ refTest.text }}</h2>

  <TabletopButton :button-label="'Button 1'" @click="buttonClick($event)"></TabletopButton>
  <TabletopButton :button-label="'Button 2'"></TabletopButton>
  <TabletopButton :button-label="'Button 3'"></TabletopButton>
</template>
