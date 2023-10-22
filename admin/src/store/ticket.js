import { request } from '@/utils'
import { defineStore } from 'pinia'

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
    },
  },
  actions: {
    init() {
      this.fetchStatuses()
      this.fetchPriorities()
    },
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

    async fetchTickets() {
      let params = {}
      let response

      if (Array.isArray(this.tickets) && this.tickets.length > 0) {
        params.lastUpdatedDate = this.tickets[0].lastUpdatedDate // with this, we are only fetching the tickets that has been updated after the last ticket in the list
      }

      await request('get', 'admin/tickets', params).then(res => {
        if (res?.data) {
          const ids = res.data?.map(ticket => ticket._id)

          this.tickets = [...res.data, ...this.tickets.filter(ticket => !ids.includes(ticket._id))]

          response = !!res.data
        }
      })

      return response
    },
    async fetchTicketById(id) {
      let response

      await request('get', `admin/tickets/${id}`).then(res => {
        if (res) {
          let ticket = this.tickets.find(ticket => ticket._id === id)

          if (ticket) {
            ticket = { ...res }
          } else {
            this.tickets.push(res)
          }
        }

        response = !!res
      })

      return response
    },
    async createComment(payload) {
      let response

      await request('post', `admin/tickets/${payload.id}`, payload).then(res => {
        if (res) {
          const ticket = this.tickets.find(ticket => ticket._id === payload.id)

          if (ticket) {
            ticket.comments.push(res)
          }
        }

        response = !!res
      })

      return response
    },
  },
})
