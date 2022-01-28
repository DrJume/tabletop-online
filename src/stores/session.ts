// session store contains local data, that is not synced with ShareDB

import { defineStore } from 'pinia'

export interface SessionState {
  user: {
    id: undefined | string
    name: string
    color: string
  }
  ui: {
    isUserProfileModalOpen: boolean
    isTabletopSidebarOpen: boolean
    tabletopBackgroundColor: string
  }
  dice: {
    min: number
    max: number
  }
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    user: {
      id: undefined,
      name: '',
      color: '',
    },
    ui: {
      isUserProfileModalOpen: true,
      isTabletopSidebarOpen: false,
      tabletopBackgroundColor: 'rgb(212 212 212)',
    },
    dice: {
      min: 1,
      max: 6,
    },
  }),
  getters: {
    safeUserId(): string {
      if (!this.user.id) {
        console.error('sessionStore.user.id is not defined!')
        throw new Error('sessionStore.user.id is not defined!')
      }

      return this.user.id
    },
  },
})
