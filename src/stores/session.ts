// session store contains local data, that is not synced with ShareDB

import { defineStore } from 'pinia'

export interface SessionState {
  userId: undefined | string
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    userId: undefined,
  }),
})
