<template>
  <TabletopSidebar button-icon="BookOpenIcon" orientation="right" caption="Logbuch">
    <div class="overflow-y-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <tbody>
          <tr
            v-for="(logItem, index) in log"
            :key="index"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <td class="py-3 px-6 text-sm text-gray-500 whitespace-nowrap">
              {{ logItem.timestamp }}
            </td>
            <td class="py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
              {{ logItem.message }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </TabletopSidebar>
</template>

<script lang="ts">
import TabletopSidebar from '@/components/UI/TabletopSidebar.vue'

const log = [
  { timestamp: '13:45', message: 'Lenny ist beigetreten' },
  { timestamp: '13:47', message: 'Julian ist beigetreten' },
  { timestamp: '13:48', message: 'Julian hat das Spiel verlassen' },
  { timestamp: '13:50', message: 'Lenny hat eine 5 gewürfelt' },
  { timestamp: '13:51', message: 'Raphael ist beigetreten' },
]

export default {
  components: {
    TabletopSidebar,
  },

  setup() {
    return {
      log,
    }
  },
}
</script>
