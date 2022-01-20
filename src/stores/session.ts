// session store contains local data, that is not synced with ShareDB

import { defineStore } from 'pinia'

export interface SessionState {
  userId: undefined | string
  ui: {
    isUserProfileModalOpen: boolean
    isTabletopSidebarOpen: boolean
  }
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    userId: undefined,
    ui: {
      isUserProfileModalOpen: true,
      isTabletopSidebarOpen: false,
    },
  }),
})
