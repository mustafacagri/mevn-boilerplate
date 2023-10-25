import { useHomepageStore, usePostStore, useUserStore } from './index'

export const useGlobalStateStore = defineStore('globalState', {
  actions: {
    async init() {
      useUserStore().init()
      usePostStore().init()
    }
  }
})
