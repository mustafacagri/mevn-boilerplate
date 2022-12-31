import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useHomepageStore, usePostStore, useUserStore } from './all'

export * from './all' // it will be an easy way to use stores like => import { useConfig, useUser } from '@/store'

export const useMainStore = defineStore('main', {
  state: () => reactive({}),
  getters: {},
  actions: {
    async init() {
      await useHomepageStore().init()
      await useUserStore().init()
      await usePostStore().init()
    },
  },
})
