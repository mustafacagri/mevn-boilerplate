import { request } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', {
  state: () =>
    reactive({
      user: {},
      token: '',
    }),
  getters: {
    getUser() {
      return state.user
    },
  },
  actions: {
    isAdmin() {
      return request('get', 'admin/check').then(res => {
        return res?.isSuccess || false
      })
    },
    init() {
      this.isAdmin()
    },
  },
})
