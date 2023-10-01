import { defineStore } from 'pinia'
import { request } from '@/utils/request'

export const useTicketStore = defineStore('ticket', {
  state: () => {
    return { statuses: null, priorities: null }
  },
  getters: {
    getStatuses() {
      return this.statuses
    },
    getPriorities() {
      return this.priorities
    }
  },
  actions: {
    init() {},
    fetchStatuses() {
      request('get', '/ticket/statuses').then(res => {
        if (res) {
          this.statuses = res.sort((a, b) => a.order - b.order)
        }
      })
    },
    fetchPriorities() {
      request('get', '/ticket/priorities').then(res => {
        if (res) {
          this.priorities = res.sort((a, b) => b.order - a.order)
        }
      })
    },
    async createTicket(payload) {
      let response

      await request('post', '/ticket', payload).then(res => {
        response = !!res
      })

      return response
    }
  }
})
