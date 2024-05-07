import { defineStore } from 'pinia'
import { request } from '@/utils/request'

export const useTodoStore = defineStore('todo', {
  state: () => {
    return { todos: [], statuses: null, priorities: null, selectedStatus: 'null', selecledPriority: null }
  },
  getters: {
    getStatuses() {
      return this.statuses
    },
    getPriorities() {
      return this.priorities
    },
    getTodos() {
      return this.todos
    },
    getTodoById: state => _id => state.todos.find(todo => todo._id === _id)
  },
  actions: {
    init() {},
    fetchStatusesAndPriorities() {
      const types = ['statuses', 'priorities']

      types.forEach(type => {
        if (!this[type]) {
          request('get', `todos/${type}`).then(res => {
            if (res) {
              this[type] = res.sort((a, b) => a.order - b.order)
            }
          })
        }
      })
    },
    async createTodo(payload) {
      let response

      await request('post', 'todos', payload).then(res => {
        response = !!res
      })

      return response
    },
    async fetchTodos() {
      let params = {}
      let response

      if (Array.isArray(this.todos) && this.todos.length > 0) {
        params.lastUpdatedDate = this.todos[0].lastUpdatedDate // with this, we are only fetching the todos that has been updated after the last todo in the list
      }

      await request('get', 'todos', params).then(res => {
        const ids = res?.map(todo => todo._id)

        this.todos = [...res, ...this.todos.filter(todo => !ids.includes(todo._id))]

        response = !!res
      })

      return response
    },
    async updateTodo(_id, payload) {
      let response

      await request('put', `todos/${_id}`, payload).then(res => {
        response = !!res
      })

      return response
    },
    async deleteTodo(id) {
      let response

      await request('delete', `todos/${id}`).then(res => {
        response = !!res

        if (response) {
          this.todos = this.todos.filter(todo => todo._id !== id)
        }
      })

      return response
    }
  }
})
