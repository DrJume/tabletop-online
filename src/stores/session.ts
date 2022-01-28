// session store contains local data, that is not synced with ShareDB

import { defineStore } from 'pinia'

export interface SessionState {
  _userId: undefined | string
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
    _userId: undefined,
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
    userId(): string {
      if (!this._userId) {
        console.error('sessionStore._userId is not defined!')
        throw new Error('sessionStore._userId is not defined!')
      }

      return this._userId
    },
  },
})
