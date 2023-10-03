import { defineStore } from 'pinia'
import { request } from '@/utils/request'

export const useTicketStore = defineStore('ticket', {
  state: () => {
    return { tickets: [], statuses: null, priorities: null }
  },
  getters: {
    getStatuses() {
      return this.statuses
    },
    getPriorities() {
      return this.priorities
    },
    getTickets() {
      return this.tickets
    }
  },
  actions: {
    init() {},
    fetchStatuses() {
      request('get', 'tickets/statuses').then(res => {
        if (res) {
          this.statuses = res.sort((a, b) => a.order - b.order)
        }
      })
    },
    fetchPriorities() {
      request('get', 'tickets/priorities').then(res => {
        if (res) {
          this.priorities = res.sort((a, b) => b.order - a.order)
        }
      })
    },
    async createTicket(payload) {
      let response

      await request('post', 'tickets', payload).then(res => {
        response = !!res
      })

      return response
    },
    async fetchTickets() {
      let params = {}
      let response

      if (Array.isArray(this.tickets) && this.tickets.length > 0) {
        params.lastUpdatedDate = this.tickets[0].lastUpdatedDate // with this, we are only fetching the tickets that has been updated after the last ticket in the list
      }

      await request('get', 'tickets', params).then(res => {
        const ids = res?.map(ticket => ticket._id)

        this.tickets = [...res, ...this.tickets.filter(ticket => !ids.includes(ticket._id))]

        response = !!res
      })

      return response
    }
  }
})
