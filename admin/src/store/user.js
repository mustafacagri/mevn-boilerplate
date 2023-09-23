import { request } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', {
  state: () =>
    reactive({
      user: {},
      token: '',
      users: [],
      roles: [],
    }),
  getters: {
    getUser() {
      return this.user
    },
    getUsers() {
      return this.users
    },
    getRoles() {
      return this.roles
    },
  },
  actions: {
    init() {
      this.isAdmin()
      this.setUsers()
      this.setRoles()
    },
    isAdmin() {
      return request('get', 'admin/check').then(res => {
        return res?.isSuccess || false
      })
    },
    async setUsers() {
      await request('get', 'admin/users').then(res => {
        if (res?.data) {
          this.users = [...res.data]
        }
      })
    },
    async setRoles() {
      await request('get', 'admin/users/roles').then(res => {
        if (res?.data) {
          this.roles = [...res.data]
        }
      })
    },
    getRolesByIds(roles) {
      return this.roles.filter(role => roles.includes(role._id))
    },
    async updateUser(payload) {
      await request('put', `admin/users/${payload._id}`, { ...payload }, 20000).then(res => {
        if (res?.data) {
          let found = this.users.find(user => user._id === payload._id)

          if (found) {
            const { username, email, isActive, roles } = payload

            found.username = username
            found.email = email
            found.isActive = isActive
            found.roles = this.getRolesByIds(roles)
          }
        }
      })
    },
  },
})
