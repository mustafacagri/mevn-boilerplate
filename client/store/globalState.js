import { useHomepageStore } from './homepage'
import { useUserStore } from './user'
import { usePostStore } from './post'

export const useGlobalStateStore = defineStore('globalState', {
  actions: {
    async init() {
      useUserStore().init()
      useHomepageStore().init()
      usePostStore().init()
    }
  }
})
