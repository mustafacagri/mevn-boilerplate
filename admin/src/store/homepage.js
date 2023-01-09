import { request } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useHomepageStore = defineStore('homepage', {
  state: () => reactive({
    stats: {},
  }),
  getters: {},
  actions: {
    async init() {

      await request('get', 'homepage/stats').then(res => {
        if (res?.data?.count) {
          this.stats = { ...res.data.count }
        }
      })
    },
  },
})



