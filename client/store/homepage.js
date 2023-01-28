import { request } from '~~/utils/request'

export const useHomepageStore = defineStore('homepage', {
  state: () => {
    return {
      stats: {},
      headerItems: [
        { text: 'Homepage', to: '/', icon: 'fa-solid fa-home' },
        { text: 'Categories', to: '/post-categories', icon: 'fa-solid fa-folder' },
        { text: 'Posts', to: '/posts', icon: 'fa-solid fa-mug-hot' }
      ]
    }
  },
  getters: {
    getHeaderItems: state => state.headerItems,
    getStats: state => state.stats
  },
  actions: {
    async init() {
      await this.fetchStats()
    },

    async fetchStats() {
      await request('get', 'homepage/stats').then(res => {
        this.setData('stats', res.count)
      })
    },

    async setData(field, payload) {
      this[field] = await payload
    }
  }
})
