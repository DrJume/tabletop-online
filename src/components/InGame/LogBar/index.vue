<!-- eslint-disable vue/no-v-html -->
<template>
  <TabletopSidebar
    v-model:open="logbarOpen"
    button-icon="BookOpenIcon"
    orientation="right"
    caption="Logbuch"
  >
    <div class="overflow-y-auto -mx-2 border-neutral-200">
      <table class="min-w-full">
        <tbody class="border-y border-neutral-200 divide-y divide-neutral-200">
          <tr
            v-for="(logItem, index) in tabletopStore.log.slice().reverse()"
            :key="index"
            :class="index % 2 === 1 ? 'bg-neutral-50' : 'bg-neutral-100'"
          >
            <td class="py-2 pr-2 pl-4 text-sm text-gray-500 whitespace-nowrap">
              {{ dateFormatter.format(new Date(logItem.timestamp)) }}
            </td>
            <td
              class="py-3 pr-1 text-sm font-medium text-gray-700 break-all"
              v-html="DomPurify.sanitize(logItem.message, { USE_PROFILES: { html: true } })"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </TabletopSidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabletopSidebar from '@/components/UI/TabletopSidebar.vue'
import { useTabletopStore } from '@/stores/tabletop'

import DomPurify from 'dompurify'

const tabletopStore = useTabletopStore()

const dateFormatter = new Intl.DateTimeFormat('de-DE', { timeStyle: 'short' })

const logbarOpen = ref(false)
</script>
